package com.epam.ridesharing.util;

import javax.mail.Authenticator;
import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.PasswordAuthentication;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import java.util.Properties;

import com.epam.ridesharing.data.model.User;

/**
 * Sends email notifications from 'epamtaxi@gmail.com' address.
 */
public class EmailSender {

    private static final String APP_MAIL_ADDRESS = "epamtaxi@gmail.com";
    private static final String APP_MAIL_PASSWORD = "h=;tW8GVa;7t>82N";
    private static final String ANONYMOUS_USER = "Anonymous User";
    private static final Session SESSION;
    public static final String SUBJECT = "Whoa! %s is riding to work at %s.";
    private static final String TEXT = "Hey %s,\n" +
            "Good news - %s just decided to get to work by car today starting at %s.";

    static {
        Properties props = new Properties();
        props.put("mail.smtp.auth", "true");
        props.put("mail.smtp.starttls.enable", "true");
        props.put("mail.smtp.host", "smtp.gmail.com");
        props.put("mail.smtp.port", "587");

        SESSION = Session.getInstance(props,
                new Authenticator() {
                    protected PasswordAuthentication getPasswordAuthentication() {
                        return new PasswordAuthentication(APP_MAIL_ADDRESS, APP_MAIL_PASSWORD);
                    }
                });
    }

    public static void sendEmail(User driver, User passenger, String time) throws MessagingException {

        Message message = new MimeMessage(SESSION);

        String userName = getName(driver);
        String subject = String.format(SUBJECT, userName, time);
        message.setSubject(subject);

        String passengerEmail = passenger.getEmail();
        passengerEmail = "Aleksei_Loginov@epam.com"; // todo temporary precaution for spam emails
        message.addRecipient(Message.RecipientType.TO, new InternetAddress(passengerEmail));

        String passengerName = getName(passenger);
        String text = String.format(TEXT, passengerName, userName, time);
        message.setText(text);

        Transport.send(message);
    }

    private static String getName(User user) {
        return user.getName() != null ? user.getName() : ANONYMOUS_USER;
    }
}
