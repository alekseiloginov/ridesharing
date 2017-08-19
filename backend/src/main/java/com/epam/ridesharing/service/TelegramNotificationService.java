package com.epam.ridesharing.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import com.epam.ridesharing.data.model.User;
import com.epam.ridesharing.service.telegram.Bot;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.telegram.telegrambots.api.methods.send.SendContact;
import org.telegram.telegrambots.api.methods.send.SendMessage;
import org.telegram.telegrambots.api.objects.Message;
import org.telegram.telegrambots.api.objects.replykeyboard.InlineKeyboardMarkup;
import org.telegram.telegrambots.api.objects.replykeyboard.buttons.InlineKeyboardButton;
import org.telegram.telegrambots.exceptions.TelegramApiException;

import static com.epam.ridesharing.util.EmailSender.SUBJECT;

/**
 * Notifies users via Telegram bot, which is available at: t.me/ridesharing_test_bot.
 */
@Service
public class TelegramNotificationService implements NotificationService {

    public static final String TOKEN = "365067214:AAEEa7B66tj9a7-GHmpiCcRb9T9YjL-GFUg";
    public static final String USERNAME = "ridesharing_test_bot";
    public static final String CHAT_ID_START = "[id#";
    public static final String CHAT_ID_END = "]";
    public static final String MY_CHAT_ID = "242329350";
    private static final String RS_BOT_CHAT_ID = "365067214";
    private static final String SPACE = " ";
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

        String passengerId = getTelegramId(passenger); // if we use this service then passenger's chat id is not null
        passengerId = MY_CHAT_ID; // todo temporary precaution for spamming users

        String text = getDriverMessage(driver, time);
        SendMessage message = new SendMessage(passengerId, text);

        addYesNoInlineKeyboard(message);

        bot.execute(message);
    }

    private String getDriverMessage(User driver, String time) throws TelegramApiException {

        String name = getDriverName(driver);
        return String.format(SUBJECT, name, time) + SPACE + WANNA_JOIN;
    }

    private String getDriverName(User driver) throws TelegramApiException {

        String driverId = getTelegramId(driver); // may be null
        driverId = MY_CHAT_ID; // todo temporary precaution for spamming users

        // if not null, pass driver chat id to reply to
        return driverId == null ? driver.getName() : driver.getName() + SPACE + CHAT_ID_START + driverId + CHAT_ID_END;
    }

    private void addYesNoInlineKeyboard(SendMessage message) {
        InlineKeyboardMarkup markup = new InlineKeyboardMarkup();
        markup.setKeyboard(addYesNoButtons());
        message.setReplyMarkup(markup);
    }

    private List<List<InlineKeyboardButton>> addYesNoButtons() {
        List<List<InlineKeyboardButton>> rowsInline = new ArrayList<>();
        List<InlineKeyboardButton> rowInline = new ArrayList<>();

        rowInline.add(new InlineKeyboardButton().setText(YES).setCallbackData(YES));
        rowInline.add(new InlineKeyboardButton().setText(NO).setCallbackData(NO));

        rowsInline.add(rowInline);
        return rowsInline;
    }


    public boolean hasTelegramId(User user) throws TelegramApiException {
        return getTelegramId(user) != null;
    }

    public String getTelegramId(User user) throws TelegramApiException {
        Optional<String> chatId = Optional.ofNullable(user.getTelegramId());

        if (!chatId.isPresent()) {

            chatId = tryGetFromTelegram(user);

            chatId.ifPresent(telegramId -> userService.saveTelegramId(user, telegramId));
        }

        return chatId.orElse(null);
    }

    private Optional<String> tryGetFromTelegram(User user) throws TelegramApiException {
        // workaround to get telegram chat id of an unknown user, found here: https://stackoverflow.com/a/42647172/4624001

        String myChatId = MY_CHAT_ID; // todo send me for now, maybe to companion/dedicated user later (can't use bots here)

        Message resp =
                bot.execute(new SendContact().setChatId(myChatId).setPhoneNumber(user.getPhone()).setFirstName(user.getName()));

        Optional<String> chatId =
                Optional.ofNullable(resp.getContact().getUserID() == null ? null : resp.getContact().getUserID().toString());

        return chatId;
    }

}