import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { sendSharedMail } from '@/lib/microsoftGraph'

export async function POST(request: Request) {
    try {
        const body = await request.json()
        const { name, email, company, phone, service, message } = body

        if (!name || !email || !service || !message) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            )
        }

        let dbStatus = 'saved';
        let dbError = null;
        let quoteRequest = null;

        // 1. Try to save to Database
        try {
            quoteRequest = await prisma.quoteRequest.create({
                data: { name, email, company, phone, service, message },
            });
        } catch (error: any) {
            console.error('Database Save Failed:', error);
            dbStatus = 'failed';
            dbError = error.message;
        }

        // 2. Send Admin Notification
        let mailStatus = 'sent';
        let mailError = null;

        try {
            const dbAlert = dbStatus === 'failed'
                ? `<div style="padding: 15px; background-color: #fef2f2; border: 2px solid #ef4444; color: #b91c1c; border-radius: 8px; margin-bottom: 20px;">
                    <strong>⚠️ DATABASE SAVE FAILED</strong><br/>
                    This lead was NOT saved to the database. Error: ${dbError}
                   </div>`
                : '';

            await sendSharedMail({
                to: process.env.SHARED_MAILBOX_ADDRESS!,
                subject: `${dbStatus === 'failed' ? '[DB ERROR] ' : ''}New Quote Request: ${service} from ${name}`,
                body: `
                    <div style="font-family: sans-serif; color: #334155; max-width: 600px;">
                        ${dbAlert}
                        <h2 style="color: #0f172a; border-bottom: 1px solid #e2e8f0; padding-bottom: 10px;">New Quote Request</h2>
                        <p><strong>Name:</strong> ${name}</p>
                        <p><strong>Email:</strong> ${email}</p>
                        <p><strong>Company:</strong> ${company || 'N/A'}</p>
                        <p><strong>Phone:</strong> ${phone || 'N/A'}</p>
                        <p><strong>Service:</strong> ${service}</p>
                        <div style="background: #f8fafc; padding: 15px; border-radius: 8px; margin-top: 15px;">
                            <strong>Message:</strong><br/>
                            ${message.replace(/\n/g, '<br/>')}
                        </div>
                    </div>
                `
            });
        } catch (error: any) {
            console.error('Admin Email Failed:', error);
            mailStatus = 'failed';
            mailError = error.message;
        }

        // 3. Send Customer Confirmation
        try {
            await sendSharedMail({
                to: email,
                subject: `We've received your request - DG SMART`,
                body: `
                    <div style="font-family: sans-serif; color: #334155; max-width: 600px; line-height: 1.6;">
                        <div style="background: #0f172a; padding: 20px; text-align: center; border-radius: 8px 8px 0 0;">
                            <h1 style="color: #4ade80; margin: 0; font-size: 24px;">Thank You!</h1>
                        </div>
                        <div style="padding: 24px; border: 1px solid #e2e8f0; border-top: none; border-radius: 0 0 8px 8px;">
                            <p>Hello <strong>${name}</strong>,</p>
                            <p>Thank you for expressing interest in <strong>${service}</strong> with DG SMART.</p>
                            <p>Our team has received your request and will review the details. We'll get back to you within 24 hours to discuss your project further.</p>
                            <div style="margin: 24px 0; padding: 16px; background: #f0fdf4; border-left: 4px solid #4ade80;">
                                <p style="margin: 0; color: #166534; font-size: 14px;"><strong>Your message:</strong><br/>"${message}"</p>
                            </div>
                            <p style="font-size: 14px; color: #64748b;">Best regards,<br/>The DG SMART Team</p>
                        </div>
                    </div>
                `
            });
        } catch (error: any) {
            console.error('Customer Confirmation Email Failed:', error);
            // We don't fail the request if just the customer email fails
        }

        return NextResponse.json({
            success: true,
            dbStatus,
            mailStatus,
            data: quoteRequest,
            mailError
        }, { status: 201 });

    } catch (error: any) {
        console.error('Critical API error:', error);
        return NextResponse.json({ error: 'Internal Server Error', details: error.message }, { status: 500 });
    }
}
