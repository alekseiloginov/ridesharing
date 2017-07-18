package com.epam.ridesharing.util;

import com.epam.ridesharing.data.model.User;

import javax.mail.*;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import java.util.List;
import java.util.Properties;

/**
 * Sends email notifications from 'epamtaxi@gmail.com' address.
 */
public class EmailSender {

    private static final String APP_MAIL_ADDRESS = "epamtaxi@gmail.com";
    private static final String APP_MAIL_PASSWORD = "h=;tW8GVa;7t>82N";
    private static final String ANONYMOUS_USER = "Anonymous User";
    private static final Session SESSION;
    private static final String SUBJECT = "Whoa! %s is riding to work at %s.";
    private static final String TEXT = "Hey %s,\n" +
            "Good news − %s just decided to get to work by car today starting at %s.";

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

    public static void sendEmail(User user, List<User> candidates, String time) throws MessagingException {

        Message message = new MimeMessage(SESSION);

        String userName = getName(user);
        String subject = String.format(SUBJECT, userName, time);
        message.setSubject(subject);

        for (User candidate : candidates) {
            String candidateEmail = candidate.getEmail();
            candidateEmail = "Aleksei_Loginov@epam.com"; // temporary precaution for spam emails
            message.addRecipient(Message.RecipientType.TO, new InternetAddress(candidateEmail));

            String candidateName = getName(candidate);
            String text = String.format(TEXT, candidateName, userName, time);
            message.setText(text);

            Transport.send(message);
        }
    }

    private static String getName(User user) {
        return user.getName() != null ? user.getName() : ANONYMOUS_USER;
    }
}
