package com.epam.ridesharing.service.telegram;

import javax.annotation.PostConstruct;

import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;
import org.telegram.telegrambots.ApiContextInitializer;
import org.telegram.telegrambots.TelegramBotsApi;
import org.telegram.telegrambots.api.methods.send.SendMessage;
import org.telegram.telegrambots.api.objects.CallbackQuery;
import org.telegram.telegrambots.api.objects.Message;
import org.telegram.telegrambots.api.objects.Update;
import org.telegram.telegrambots.bots.TelegramLongPollingBot;
import org.telegram.telegrambots.exceptions.TelegramApiException;

import static com.epam.ridesharing.service.TelegramNotificationService.CHAT_ID_END;
import static com.epam.ridesharing.service.TelegramNotificationService.CHAT_ID_START;
import static com.epam.ridesharing.service.TelegramNotificationService.MY_CHAT_ID;
import static com.epam.ridesharing.service.TelegramNotificationService.TOKEN;
import static com.epam.ridesharing.service.TelegramNotificationService.USERNAME;

/**
 * Ridesharing telegram bot for notifying and getting feedback from users.
 */
@Component
public class Bot extends TelegramLongPollingBot {
    private static final Logger LOG = LoggerFactory.getLogger(Bot.class);
    private static final String ECHO = "you said: ";
    private static final String SPACE = " ";
    private static final String COLON = ":";

    // Bot initialization //

    static {
        ApiContextInitializer.init(); // must be initialized before a bot's constructor
    }

    @PostConstruct
    public void bootBot() {
        try {
            new TelegramBotsApi().registerBot(this);

        } catch (TelegramApiException e) {
            LOG.error("Error in Bot.bootBot: ", e);
        }
    }

    // Bot logic //

    @Override
    public void onUpdateReceived(Update update) { // processes incoming message from a user

        try {

            if (update.hasCallbackQuery()) {
                replyToDriver(update);

            } else if (update.hasMessage()) {
                processMessage(update); // any other message/command to bot
            }

        } catch (TelegramApiException e) {
            LOG.error("Error in Bot.onUpdateReceived: ", e);
        }
    }

    private void replyToDriver(Update update) throws TelegramApiException {
        CallbackQuery response = update.getCallbackQuery();
        String responseText = response.getData();

        if (responseText != null) { // notify the driver back

            String driversMessage = response.getMessage().getText();

            String chatId = StringUtils.substringBetween(driversMessage, CHAT_ID_START, CHAT_ID_END);
            chatId = MY_CHAT_ID; // TODO temporary precaution for spamming users

            String firstName = response.getFrom().getFirstName();
            String lastName = response.getFrom().getLastName();

            sendText(chatId, firstName + SPACE + lastName + COLON + SPACE + responseText);
        }
    }

    private void processMessage(Update update) throws TelegramApiException {
        Message message = update.getMessage();

        if (message.hasText()) {
            String userText = message.getText();
            String chatId = message.getChatId().toString();

            sendText(chatId, ECHO + userText);
        }
    }

    private void sendText(String chatId, String text) throws TelegramApiException {

        execute(new SendMessage(chatId, text));
    }

    @Override
    public String getBotUsername() {
        return USERNAME;
    }

    @Override
    public String getBotToken() {
        return TOKEN;
    }
}
