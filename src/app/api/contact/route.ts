import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { sendSharedMail } from '@/lib/microsoftGraph'

export async function POST(request: Request) {
    try {
        const body = await request.json()
        const { name, email, company, phone, message } = body

        if (!name || !email || !message) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            )
        }

        let dbStatus = 'saved';
        let dbError = null;
        let contactMessage = null;

        // 1. Try to save to Database
        try {
            contactMessage = await prisma.contactMessage.create({
                data: { name, email, company, phone, message },
            });
        } catch (error: any) {
            console.error('Database Save Failed:', error);
            dbStatus = 'failed';
            dbError = error.message;
        }

        // 2. Always send Email Notification
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
                subject: `${dbStatus === 'failed' ? '[DB ERROR] ' : ''}New Contact Message from ${name}`,
                body: `
                    ${dbAlert}
                    <h3>New Contact Details:</h3>
                    <p><strong>Name:</strong> ${name}</p>
                    <p><strong>Email:</strong> ${email}</p>
                    <p><strong>Company:</strong> ${company || 'N/A'}</p>
                    <p><strong>Phone:</strong> ${phone || 'N/A'}</p>
                    <p><strong>Message:</strong> ${message}</p>
                `
            });
        } catch (error: any) {
            console.error('Email Send Failed:', error);
            mailStatus = 'failed';
            mailError = error.message;
        }

        return NextResponse.json({
            success: true,
            dbStatus,
            mailStatus,
            data: contactMessage,
            mailError
        }, { status: 201 });

    } catch (error: any) {
        console.error('Critical API error:', error);
        return NextResponse.json({ error: 'Internal Server Error', details: error.message }, { status: 500 });
    }
}
