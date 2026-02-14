import nodemailer from 'nodemailer';

const sendEmail = async (options: { email: string; subject: string; message: string }) => {
    // In development, if SMTP is not configured, just log the email instead of sending
    if (!process.env.SMTP_HOST || !process.env.SMTP_USER) {
        console.log('\n📧 ========== EMAIL (Development Mode) ==========');
        console.log(`To: ${options.email}`);
        console.log(`Subject: ${options.subject}`);
        console.log(`Message: ${options.message}`);
        console.log('================================================\n');
        return; // Skip actual email sending
    }

    const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: parseInt(process.env.SMTP_PORT || '587'),
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
        },
    });

    const mailOptions = {
        from: `"EqualHeart" <${process.env.SMTP_USER}>`,
        to: options.email,
        subject: options.subject,
        text: options.message,
        html: `<div style="font-family: Arial, sans-serif; padding: 20px;">
      <h2>EqualHeart Verification</h2>
      <p>${options.message}</p>
    </div>`,
    };

    await transporter.sendMail(mailOptions);
};

export default sendEmail;
