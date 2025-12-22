import { OrderConfirmationTemplate } from '@/app/components/emails/OrderConfirmationTemplate';
import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { render } from '@react-email/render';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
    try {
        if (!process.env.RESEND_API_KEY) {
            return NextResponse.json({ error: "Missing API Key" }, { status: 500 });
        }

        const body = await request.json();
        const { email, childName, packageName, price } = body;

        console.log(`📨 Pregătesc email pentru: ${email}`);

        const emailHtml = await render(
            OrderConfirmationTemplate({
                childName,
                packageName,
                price
            })
        );

        const { data, error } = await resend.emails.send({
            from: 'Biroul Mosului <contact@biroulmosului.ro>',
            to: [email],
            subject: `Comandă confirmată pentru ${childName}! 🎅`,
            html: emailHtml,
        });

        if (error) {
            console.error("❌ EROARE RESEND:", error);
            return NextResponse.json({ error }, { status: 500 });
        }

        console.log("✅ Email trimis cu succes! ID:", data?.id);
        return NextResponse.json(data);

    } catch (error: any) {
        console.error("❌ EROARE SERVER (Catch):", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}