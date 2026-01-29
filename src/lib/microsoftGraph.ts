import { Client } from "@microsoft/microsoft-graph-client";
import { ClientSecretCredential } from "@azure/identity";
import { TokenCredentialAuthenticationProvider } from "@microsoft/microsoft-graph-client/authProviders/azureTokenCredentials";

interface SendMailParams {
    to: string;
    subject: string;
    body: string;
}

export async function sendSharedMail({ to, subject, body }: SendMailParams) {
    const tenantId = process.env.TENANT_ID;
    const clientId = process.env.APPLICATION_ID;
    const clientSecret = process.env.CLIENT_SECRET_VALUE;
    const sharedMailbox = process.env.SHARED_MAILBOX_ADDRESS;

    if (!tenantId || !clientId || !clientSecret || !sharedMailbox) {
        throw new Error("Missing Microsoft Graph configuration in environment variables.");
    }

    const credential = new ClientSecretCredential(
        tenantId,
        clientId,
        clientSecret
    );

    const authProvider = new TokenCredentialAuthenticationProvider(credential, {
        scopes: ["https://graph.microsoft.com/.default"],
    });

    const client = Client.initWithMiddleware({ authProvider });

    const sendMailPayload = {
        message: {
            subject: subject,
            body: {
                contentType: "HTML",
                content: body,
            },
            toRecipients: [
                {
                    emailAddress: {
                        address: to,
                    },
                },
            ],
        },
        saveToSentItems: "true",
    };

    // The key part: send from the shared mailbox ID/email
    console.log(`Attempting to send email via Microsoft Graph from ${sharedMailbox} to ${to}...`);

    try {
        const result = await client
            .api(`/users/${sharedMailbox}/sendMail`)
            .post(sendMailPayload);
        console.log('Microsoft Graph sendMail success!');
        return result;
    } catch (error: any) {
        console.error('Microsoft Graph API Error Detail:', {
            message: error.message,
            code: error.code,
            statusCode: error.statusCode,
            body: error.body,
        });
        throw error;
    }
}
