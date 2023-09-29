import bcrypt from "bcryptjs";
import User from "@/models/userModel";
import nodemailer from "nodemailer";

export const sendEmail = async ({email, emailType, userID}: any) => {
    try {
        const hashedToken = await bcrypt.hash(userID.toString(), 10);
        if(emailType === "VERIFY"){
            await User.findByIdAndUpdate(userID, {
                verifiedToken: hashedToken, 
                verifiedTokenExpiry: Date.now() + 3600000
            })
        }else if(emailType === "RESET"){
            await User.findByIdAndUpdate(userID, {
                forgotPasswordToken: hashedToken, 
                forgotPasswordTokenExpiry: Date.now() + 3600000
            })
        };
        const { NODEMAILER_USER, NODEMAILER_PASS} = process.env
        var transport = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
              user: NODEMAILER_USER,
              pass: NODEMAILER_PASS
            }
          });

        const mailOptions = {
            from: 'ttarunn0709@gmail.com',
            to: email,
            subject: emailType === "VERIFY" ? "Verify your email" : "Reset your password",
            html: `<p>Click <a href="${process.env.DOMAIN}/${emailType === "VERIFY" ? "verifyemail" : "resetpassword"}?token=${hashedToken}">here</a> to ${emailType === "VERIFY" ? "verify your email" : "reset your password"}
            or copy and paste the link below in your browser. <br> ${process.env.DOMAIN}/${emailType === "VERIFY" ? "verifyemail" : "resetpassword"}?token=${hashedToken}
            </p>`
        }

        const mailresponse = await transport.sendMail
        (mailOptions);

        return mailresponse;

    } catch (error: any) {
        throw new Error(error.message);
    }
}