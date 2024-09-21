import nodemailer from 'nodemailer'

const emailResetPassword = async (data) => {
    const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    const {
        email,
        name,
        token
    } = data;

    const info = await transporter.sendMail({
        from: "APV - Veterinary administrator",
        to: email,
        subject: 'Reset you password',
        text: 'Confirm your APV account registration',
        html: `<p>Hi ${name}, <br><br>
        We received a request to reset your password for your account with us. To proceed with resetting your password, please click the link below:<br>
        <a href="${process.env.DOMAIN_URL}/reset-password/${token}">Reset Password</a><br><br>
        If you didn't request a password reset, you can safely ignore this email. Your account security is important to us, so no changes have been made to your account at this time.<br><br>
        Thank you,<br>
        The Vet APV Team
        </p>`

    })

    console.log("Message sent: %s", info.messageId);
}

export default emailResetPassword;