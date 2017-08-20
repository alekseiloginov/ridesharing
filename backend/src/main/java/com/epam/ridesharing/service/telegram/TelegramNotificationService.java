package com.epam.ridesharing.service.telegram;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import com.epam.ridesharing.data.model.User;
import com.epam.ridesharing.service.NotificationService;
import com.epam.ridesharing.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.telegram.telegrambots.api.methods.send.SendMessage;
import org.telegram.telegrambots.api.objects.Message;
import org.telegram.telegrambots.api.objects.replykeyboard.InlineKeyboardMarkup;
import org.telegram.telegrambots.api.objects.replykeyboard.buttons.InlineKeyboardButton;
import org.telegram.telegrambots.exceptions.TelegramApiException;

import static com.epam.ridesharing.util.EmailSender.SUBJECT;

/**
 * Notifies users via Telegram bot.
 */
@Service
public class TelegramNotificationService implements NotificationService {

    public static final String EMAIL_START = "[email: ";
    public static final String EMAIL_END = "]";
    private static final String BOT_FATHER_CHAT_ID = "396175631";
    private static final String SPACE = " ";
    private static final String COLON = ":";
    private static final String YES = "I'm ready!";
    private static final String NO = "Next time!";
    private static final String WANNA_JOIN = "Wanna join?";
    private final Bot bot;
    private final UserService userService;

    @Autowired
    public TelegramNotificationService(Bot bot, UserService userService) {
        this.bot = bot;
        this.userService = userService;
    }

    @Override
    public void notifyPassenger(User driver, User passenger, String time) throws Exception {

        String passengerId = passenger.getTelegramId(); // if we use this service then chat id is not null

        String text = getDriverMessage(driver, time);
        SendMessage message = new SendMessage(passengerId, text);

        addYesNoInlineKeyboard(message, passenger);

        // send driver's contact first
        bot.sendContact(passengerId, driver);

        // then send the actual message
        bot.execute(message);
    }

    private String getDriverMessage(User driver, String time) throws TelegramApiException {

        String name = getDriverName(driver);
        return String.format(SUBJECT, name, time) + SPACE + WANNA_JOIN;
    }

    private String getDriverName(User driver) throws TelegramApiException {

        // if not null, pass driver's email to fetch later from database and reply to
        return driver.getName() + SPACE + EMAIL_START + driver.getEmail() + EMAIL_END;
    }

    private void addYesNoInlineKeyboard(SendMessage message, User passenger) {
        InlineKeyboardMarkup markup = new InlineKeyboardMarkup();
        markup.setKeyboard(addYesNoButtons(passenger));
        message.setReplyMarkup(markup);
    }

    private List<List<InlineKeyboardButton>> addYesNoButtons(User passenger) {
        List<List<InlineKeyboardButton>> rowsInline = new ArrayList<>();
        List<InlineKeyboardButton> rowInline = new ArrayList<>();

        rowInline.add(getResponseButton(passenger, YES));
        rowInline.add(getResponseButton(passenger, NO));

        rowsInline.add(rowInline);
        return rowsInline;
    }

    private InlineKeyboardButton getResponseButton(User user, String resp) {
        return new InlineKeyboardButton()
                .setText(resp)
                .setCallbackData(user.getName() + SPACE + EMAIL_START + user.getEmail() + EMAIL_END + COLON + SPACE + resp);
    }


    public boolean hasTelegramId(User user) throws TelegramApiException {
        return tryGetTelegramId(user).isPresent();
    }

    public Optional<String> tryGetTelegramId(User user) throws TelegramApiException {
        Optional<String> chatId = Optional.ofNullable(user.getTelegramId());

        if (!chatId.isPresent()) {

            chatId = tryGetFromTelegram(user);

            chatId.ifPresent(telegramId -> userService.saveTelegramId(user, telegramId));
        }

        return chatId;
    }

    private Optional<String> tryGetFromTelegram(User user) throws TelegramApiException {
        // workaround to get telegram chat id of an unknown user, found here: stackoverflow.com/a/42647172/4624001

        Optional<Message> resp = bot.sendContact(BOT_FATHER_CHAT_ID, user);

        Integer chatId = resp.isPresent() ? resp.get().getContact().getUserID() : null;

        return Optional.ofNullable(chatId == null ? null : chatId.toString());
    }

}