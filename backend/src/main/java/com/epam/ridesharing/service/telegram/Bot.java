package com.epam.ridesharing.service.telegram;

import javax.annotation.PostConstruct;
import java.util.Optional;

import com.epam.ridesharing.data.model.User;
import com.epam.ridesharing.service.UserService;
import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.telegram.telegrambots.ApiContextInitializer;
import org.telegram.telegrambots.TelegramBotsApi;
import org.telegram.telegrambots.api.methods.send.SendContact;
import org.telegram.telegrambots.api.methods.send.SendMessage;
import org.telegram.telegrambots.api.objects.CallbackQuery;
import org.telegram.telegrambots.api.objects.Message;
import org.telegram.telegrambots.api.objects.Update;
import org.telegram.telegrambots.bots.TelegramLongPollingBot;
import org.telegram.telegrambots.exceptions.TelegramApiException;

import static com.epam.ridesharing.service.telegram.TelegramNotificationService.EMAIL_END;
import static com.epam.ridesharing.service.telegram.TelegramNotificationService.EMAIL_START;

/**
 * Ridesharing telegram bot for notifying and getting feedback from users.
 * Prod bot is available at: t.me/EpamRideSharingBot.
 * Test bot is available at: t.me/ridesharing_test_bot.
 * Only ONE bot can be instantiated at a time.
 */
@Component
public class Bot extends TelegramLongPollingBot {

    private static final String PROD_TOKEN = "335478500:AAEcsglxf_bjUCE8S8Tm1lzrC04UVzfZ4zU";
    private static final String PROD_USERNAME = "EpamRideSharingBot";

    private static final String TEST_TOKEN = "365067214:AAEEa7B66tj9a7-GHmpiCcRb9T9YjL-GFUg";
    private static final String TEST_USERNAME = "ridesharing_test_bot";

    private static final Logger LOG = LoggerFactory.getLogger(Bot.class);
    private static final String ECHO = "you said: ";
    private static final String CONTACT_WITHOUT_NAME = "contact without name";
    private final UserService userService;

    // Bot initialization //

    static {
        ApiContextInitializer.init(); // must be initialized before a bot's constructor
    }

    @Autowired
    public Bot(UserService userService) {
        this.userService = userService;
    }

    @PostConstruct
    public void bootBot() {
        try {
            new TelegramBotsApi().registerBot(this);

        } catch (TelegramApiException e) {
            LOG.error(e.toString(), e);
        }
    }

    // Bot logic //

    public void sendMessageWithContact(User to, User from, String message) throws TelegramApiException {

        String toChatId = to.getTelegramId(); // if we are happen to be here, then chat id is not null

        // sender's contact first
        sendContact(toChatId, from);

        // then sender's message
        sendMessage(toChatId, message);
    }

    public Optional<Message> sendContact(String toChatId, User contact) throws TelegramApiException {
        Optional<Message> response = Optional.empty();

        if (contact.getPhone() != null) { // phone and name cannot be empty

            String name = contact.getName() != null ? contact.getName() : CONTACT_WITHOUT_NAME;

            response = Optional.of(execute(new SendContact()
                    .setChatId(toChatId)
                    .setPhoneNumber(contact.getPhone()).setFirstName(name)));
        }

        return response;
    }

    public void sendMessage(String chatId, String text) throws TelegramApiException {

        execute(new SendMessage(chatId, text));
    }

    @Override
    public void onUpdateReceived(Update update) { // processes incoming message from a user

        try {

            if (update.hasCallbackQuery()) {
                replyToDriver(update);

            } else if (update.hasMessage()) {
                echoMessage(update.getMessage()); // any other message/command to bot
            }

        } catch (TelegramApiException e) {
            LOG.error(e.toString(), e);
        }
    }

    private void replyToDriver(Update update) throws TelegramApiException {
        CallbackQuery response = update.getCallbackQuery();
        String passengerResponse = response.getData();

        if (passengerResponse != null) { // notify the driver back

            String driversMessage = response.getMessage().getText();

            String driverEmail = parseEmail(driversMessage);
            String passengerEmail = parseEmail(passengerResponse);

            Optional<User> driver = userService.findUserByEmail(driverEmail);
            Optional<User> passenger = userService.findUserByEmail(passengerEmail);

            if (driver.isPresent() && passenger.isPresent()) {

                sendMessageWithContact(driver.get(), passenger.get(), passengerResponse);
            }

        }
    }

    private String parseEmail(String text) {
        return StringUtils.substringBetween(text, EMAIL_START, EMAIL_END);
    }

    private void echoMessage(Message message) throws TelegramApiException {

        if (message.hasText()) {
            String userText = message.getText();
            String chatId = message.getChatId().toString();

            sendMessage(chatId, ECHO + userText);
        }
    }

    @Override
    public String getBotUsername() {
        return PROD_USERNAME;
    }

    @Override
    public String getBotToken() {
        return PROD_TOKEN;
    }
}
