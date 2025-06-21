import sgMail from "@sendgrid/mail";
import dotenv, { config } from "dotenv";

dotenv.config();

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const From = process.env.SENDER_EMAIL;

export const sendEmail = async (to, subject, body) => {
    try {
        const msg = {
            to: to,
            from: From,
            subject: subject,
            html: body,
        };
        await sgMail.send(msg);
        console.log("Email sent successfully");
        return true;
    } catch (error) {
        console.error("Error sending email:", error);
        return false;
    }
};


