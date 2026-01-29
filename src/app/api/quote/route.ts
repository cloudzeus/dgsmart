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

        const quoteRequest = await prisma.quoteRequest.create({
            data: {
                name,
                email,
                company,
                phone,
                service,
                message,
            },
        })

        let mailSent = false
        let mailErrorDetails = null

        // Send email notification
        try {
            await sendSharedMail({
                to: process.env.SHARED_MAILBOX_ADDRESS!,
                subject: `New Quote Request: ${service} from ${name}`,
                body: `<p>You have a new quote request:</p>
                       <p><strong>Name:</strong> ${name}</p>
                       <p><strong>Email:</strong> ${email}</p>
                       <p><strong>Service:</strong> ${service}</p>
                       <p><strong>Message:</strong> ${message}</p>`
            });
            mailSent = true
        } catch (mailError: any) {
            console.error('Failed to send quote email:', mailError)
            mailErrorDetails = mailError.message
        }

        return NextResponse.json({
            ...quoteRequest,
            mailStatus: mailSent ? 'sent' : 'failed',
            mailError: mailErrorDetails
        }, { status: 201 })
    } catch (error: any) {
        console.error('Quote request error details:', {
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
