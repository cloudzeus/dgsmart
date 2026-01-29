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

        const contactMessage = await prisma.contactMessage.create({
            data: {
                name,
                email,
                company,
                phone,
                message,
            },
        })

        let mailSent = false
        let mailErrorDetails = null

        // Send email notification
        try {
            await sendSharedMail({
                to: process.env.SHARED_MAILBOX_ADDRESS!,
                subject: `New Contact Message from ${name}`,
                body: `<p>You have a new contact message:</p>
                       <p><strong>Name:</strong> ${name}</p>
                       <p><strong>Email:</strong> ${email}</p>
                       <p><strong>Message:</strong> ${message}</p>`
            });
            mailSent = true
        } catch (mailError: any) {
            console.error('Failed to send contact email:', mailError)
            mailErrorDetails = mailError.message
        }

        return NextResponse.json({
            ...contactMessage,
            mailStatus: mailSent ? 'sent' : 'failed',
            mailError: mailErrorDetails
        }, { status: 201 })
    } catch (error: any) {
        console.error('Contact form error details:', {
            message: error.message,
            stack: error.stack,
            error
        })
        return NextResponse.json(
            {
                error: 'Internal Server Error',
                details: error.message
            },
            { status: 500 }
        )
    }
}
