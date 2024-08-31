package com.aakash.todoapp.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;

@Service
public class MailService {

    @Autowired
    private JavaMailSender mailSender;

    public void sendRegistrationEmail(String toEmail, String username) {
        MimeMessage message = mailSender.createMimeMessage();

        try {
            MimeMessageHelper helper = new MimeMessageHelper(message, true);
            helper.setTo(toEmail);
            helper.setSubject("Welcome to ElliteFocus!");

            // HTML content with inline image at the top
            String htmlContent = "<html><body>"
                    + "<div style='text-align: center;'>"
                    + "<img src='cid:logoImage' style='width: auto; height: 150px;' alt='ElliteFocus Logo'>"
                    + "</div>"
                    + "<p>Dear " + username + ",</p>"
                    + "<p>Thank you for registering with ElliteFocus, your ultimate task-tracking solution powered by Valuebound. We're excited to have you on board and are committed to helping you streamline your tasks and boost productivity.</p>"
                    + "<p>To get started, please log in to your account using the link below:</p>"
                    + "<a href='https://ellitefocus-frontend.vercel.app/login'>Login to ElliteFocus</a>"
                    + "<p>If you have any questions or need support, feel free to reach out to us anytime.</p>"
                    + "<p>Best regards,<br>"
                    + "Team ElliteFocus<br>"
                    + "Indore, Madhya Pradesh<br>"
                    + "Phone: 7852059628<br>"
                    + "Email: <a href='mailto:team@ellitefocus.com'>team@ellitefocus.com</a></p>"
                    + "</body></html>";

            helper.setText(htmlContent, true);

            // Add inline image (logo)
            ClassPathResource resource = new ClassPathResource("static/welcome.jpg");  // Ensure the image path is correct
            helper.addInline("logoImage", resource);

            mailSender.send(message);
            System.out.println("Email sent successfully");

        } catch (MessagingException e) {
            System.err.println("Error sending email: " + e.getMessage());
        }
    }
}
