import nodemailer from 'nodemailer';

interface EmailOptions {
  to: string;
  subject: string;
  html: string;
}

// Create transporter
const createTransporter = () => {
  return nodemailer.createTransport({
    host: process.env.EMAIL_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.EMAIL_PORT || '587'),
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
};

export const sendEmail = async (options: EmailOptions): Promise<void> => {
  try {
    const transporter = createTransporter();

    const mailOptions = {
      from: `"${process.env.EMAIL_FROM_NAME || 'Portfolio'}" <${process.env.EMAIL_USER}>`,
      to: options.to,
      subject: options.subject,
      html: options.html,
    };

    await transporter.sendMail(mailOptions);
    console.log('Email sent successfully to:', options.to);
  } catch (error) {
    console.error('Error sending email:', error);
    throw new Error('Failed to send email');
  }
};

export const sendContactNotification = async (
  name: string,
  email: string,
  subject: string,
  message: string
): Promise<void> => {
  const html = `
    <div style="font-family: Arial, sans-serif; padding: 20px;">
      <h2 style="color: #4F46E5;">New Contact Form Submission</h2>
      <div style="background-color: #f3f4f6; padding: 15px; border-radius: 5px;">
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
        <p><strong>Subject:</strong> ${subject || 'No subject'}</p>
        <hr style="border: 1px solid #e5e7eb;">
        <p><strong>Message:</strong></p>
        <p style="white-space: pre-wrap;">${message}</p>
      </div>
      <p style="color: #6b7280; font-size: 12px; margin-top: 20px;">
        This email was sent from your portfolio contact form.
      </p>
    </div>
  `;

  await sendEmail({
    to: process.env.CONTACT_EMAIL || process.env.EMAIL_USER || '',
    subject: `Portfolio Contact: ${subject || 'New Message'}`,
    html,
  });
};
