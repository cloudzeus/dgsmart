import { NextResponse } from 'next/server';
import { sendSharedMail } from '@/lib/microsoftGraph';

export async function POST(request: Request) {
  try {
    const { email, name, message, subject, company, phone, service } = await request.json();

    if (!email || !message) {
      return NextResponse.json({ error: "Email and message are required" }, { status: 400 });
    }

    // Send notification to the shared mailbox (about the new contact)
    await sendSharedMail({
      to: process.env.SHARED_MAILBOX_ADDRESS!,
      subject: subject || `New Contact Form: ${service || 'General Inquiry'} from ${name}`,
      body: `
        <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; padding: 40px; color: #1e293b; background-color: #f8fafc;">
          <div style="max-width: 600px; margin: 0 auto; background: white; border-radius: 12px; overflow: hidden; shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);">
            <div style="background: #0f172a; padding: 20px; text-align: center;">
              <h1 style="color: white; margin: 0; font-size: 24px;">New Lead Submission</h1>
            </div>
            <div style="padding: 30px;">
              <p style="margin-bottom: 20px; font-size: 16px; line-height: 1.5;">You have received a new message from the website contact form.</p>
              
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0; font-weight: 600; width: 120px;">Name</td>
                  <td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0;">${name}</td>
                </tr>
                <tr>
                  <td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0; font-weight: 600;">Email</td>
                  <td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0;">${email}</td>
                </tr>
                ${company ? `<tr><td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0; font-weight: 600;">Company</td><td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0;">${company}</td></tr>` : ''}
                ${phone ? `<tr><td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0; font-weight: 600;">Phone</td><td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0;">${phone}</td></tr>` : ''}
                ${service ? `<tr><td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0; font-weight: 600;">Service</td><td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0;">${service}</td></tr>` : ''}
              </table>

              <div style="margin-top: 30px;">
                <p style="font-weight: 600; margin-bottom: 10px;">Message:</p>
                <div style="background: #f1f5f9; padding: 20px; border-radius: 8px; font-style: italic;">
                  ${message.replace(/\n/g, '<br/>')}
                </div>
              </div>
            </div>
            <div style="background: #f1f5f9; padding: 15px; text-align: center; font-size: 12px; color: #64748b;">
              This is an automated notification from DGSMART Contact Form.
            </div>
          </div>
        </div>
      `,
    });

    // Optionally send a confirmation email to the user
    await sendSharedMail({
      to: email,
      subject: `Thank you for contacting DGSMART, ${name}`,
      body: `
        <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; padding: 40px; color: #1e293b; background-color: #f8fafc;">
          <div style="max-width: 600px; margin: 0 auto; background: white; border-radius: 12px; overflow: hidden;">
            <div style="background: #4ade80; padding: 20px; text-align: center;">
              <h1 style="color: white; margin: 0; font-size: 24px;">Message Received!</h1>
            </div>
            <div style="padding: 30px;">
              <h2 style="color: #0f172a;">Hi ${name},</h2>
              <p style="font-size: 16px; line-height: 1.5;">Thank you for reaching out to us. We have received your message regarding <strong>${service || 'our services'}</strong> and our team will get back to you within 24 hours.</p>
              
              <div style="margin: 30px 0; padding: 20px; border-left: 4px solid #4ade80; background: #f0fdf4;">
                <p style="margin: 0; font-style: italic;">"We're excited to learn more about your project and explore how we can help you achieve your goals."</p>
              </div>

              <p style="font-size: 14px; color: #64748b;">Best regards,<br/>The DGSMART Team</p>
            </div>
            <div style="background: #0f172a; padding: 20px; text-align: center; color: white; font-size: 12px;">
              © 2026 DGSMART. All rights reserved.
            </div>
          </div>
        </div>
      `,
    });

    return NextResponse.json({ success: true, message: "Emails sent successfully" });
  } catch (error: any) {
    console.error("Mail Error Details:", {
      message: error.message,
      code: error.code,
      statusCode: error.statusCode,
      body: error.body,
      error
    });
    return NextResponse.json({
      error: error.message || "Failed to send email",
      details: error.body || error.message
    }, { status: 500 });
  }
}
