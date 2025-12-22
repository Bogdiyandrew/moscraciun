import { ContactFormTemplate } from '@/app/components/emails/ContactFormTemplate';
import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { render } from '@react-email/render';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { name, email, message } = body;

        if (!name || !email || !message) {
            return NextResponse.json({ error: "Toate câmpurile sunt obligatorii" }, { status: 400 });
        }
        const emailHtml = await render(
            ContactFormTemplate({ name, email, message })
        );

        const { data, error } = await resend.emails.send({
            from: 'Biroul Mosului <contact@biroulmosului.ro>',
            to: ['contact@biroulmosului.ro'],
            replyTo: email,
            subject: `Mesaj nou de la ${name}`,
            html: emailHtml,
        });

        if (error) {
            return NextResponse.json({ error }, { status: 500 });
        }

        return NextResponse.json(data);
    } catch (error) {
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}