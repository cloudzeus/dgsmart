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
    return await client
        .api(`/users/${sharedMailbox}/sendMail`)
        .post(sendMailPayload);
}
