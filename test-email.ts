import { sendSharedMail } from './src/lib/microsoftGraph'
import dotenv from 'dotenv'
import path from 'path'

dotenv.config({ path: path.resolve(process.cwd(), '.env') })

async function main() {
    console.log('Testing Microsoft Graph API...')
    console.log('Using Shared Mailbox:', process.env.SHARED_MAILBOX_ADDRESS)

    try {
        await sendSharedMail({
            to: process.env.SHARED_MAILBOX_ADDRESS!,
            subject: 'Test Email from DG Smart Dev',
            body: '<h1>Test successful!</h1><p>Your Microsoft Graph integration is working.</p>'
        })
        console.log('Email sent successfully!')
    } catch (error) {
        console.error('Failed to send email:', error)
    }
}

main()
