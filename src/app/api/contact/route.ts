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

        // Execute DB save and Email send independently and in parallel
        const [dbResult, mailResult] = await Promise.allSettled([
            prisma.contactMessage.create({
                data: { name, email, company, phone, message },
            }),
            sendSharedMail({
                to: process.env.SHARED_MAILBOX_ADDRESS!,
                subject: `New Contact Message from ${name}`,
                body: `<p>You have a new contact message:</p>
                       <p><strong>Name:</strong> ${name}</p>
                       <p><strong>Email:</strong> ${email}</p>
                       <p><strong>Message:</strong> ${message}</p>`
            })
        ]);

        const dbSuccess = dbResult.status === 'fulfilled';
        const mailSuccess = mailResult.status === 'fulfilled';

        if (!dbSuccess) {
            console.error('Database failed but continuing to respond:', (dbResult as PromiseRejectedResult).reason);
        }
        if (!mailSuccess) {
            console.error('Email failed but continuing to respond:', (mailResult as PromiseRejectedResult).reason);
        }

        return NextResponse.json({
            success: true,
            dbStatus: dbSuccess ? 'saved' : 'failed',
            mailStatus: mailSuccess ? 'sent' : 'failed',
            data: dbSuccess ? (dbResult as PromiseFulfilledResult<any>).value : null,
            mailError: !mailSuccess ? (mailResult as PromiseRejectedResult).reason?.message : null
        }, { status: 201 });

    } catch (error: any) {
        console.error('Critical API error:', error);
        return NextResponse.json({ error: 'Internal Server Error', details: error.message }, { status: 500 });
    }
}
