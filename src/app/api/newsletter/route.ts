import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(request: Request) {
    try {
        const body = await request.json()
        const { email } = body

        if (!email) {
            return NextResponse.json(
                { error: 'Email is required' },
                { status: 400 }
            )
        }

        const subscriber = await prisma.newsletterSubscriber.create({
            data: {
                email,
            },
        })

        return NextResponse.json(subscriber, { status: 201 })
    } catch (error: any) {
        if (error.code === 'P2002') {
            return NextResponse.json(
                { error: 'Email already subscribed' },
                { status: 400 }
            )
        }
        console.error('Newsletter subscription error:', error)
        return NextResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 }
        )
    }
}
