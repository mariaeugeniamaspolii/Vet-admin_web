import nodemailer from 'nodemailer'

const emailRegister = async(data) => {
    const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    const { email, name, token } = data;

    const info = await transporter.sendMail({
        from: "APV - Veterinary administrator",
        to: email,
        subject: 'Confirm your APV account registration',
        text: 'Confirm your APV account registration',
        html: `<p>Hi ${name}, <br><br>
        Welcome tu the Vet APV administrator. To complete the registration process and access all the features of our platform, please confirm your account by clicking the link below:
        <a href="${process.env.DOMAIN_URL}/account-confirmation/${token}">Confirm account</a>
        <br>
        By confirming your account, you agree to abide by our terms of service and privacy policy.</p>
        <p>If you did not sign up for an account with us, please disregard this email.
        Thank you,
        The Vet APV Team </p>`

    })

    console.log("Message sent: %s", info.messageId);
}

export default emailRegister;