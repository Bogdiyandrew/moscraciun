import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { supabase } from '@/utils/supabase';
import { Resend } from 'resend';
import { OrderConfirmationTemplate } from '@/app/components/emails/OrderConfirmationTemplate';
import { render } from '@react-email/render';

// Inițializăm Stripe
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    typescript: true,
});

// Inițializăm Resend (Email)
const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
    try {
        const { sessionId } = await req.json();

        if (!sessionId) {
            return NextResponse.json({ error: 'Missing session_id' }, { status: 400 });
        }

        // 1. Verificăm sesiunea la Stripe
        const session = await stripe.checkout.sessions.retrieve(sessionId);

        if (session.payment_status !== 'paid') {
            return NextResponse.json({ error: 'Plata nu a fost finalizată.' }, { status: 400 });
        }

        // Recuperăm Order ID pe care l-am pus în metadata când am creat sesiunea
        const orderId = session.metadata?.orderId;

        if (!orderId) {
            console.error("Nu am găsit orderId în metadata Stripe:", session.id);
            return NextResponse.json({ error: 'Comanda nu a fost găsită în metadata.' }, { status: 400 });
        }

        // 2. Verificăm în baza de date
        const { data: existingOrder } = await supabase
            .from('orders')
            .select('*')
            .eq('id', orderId)
            .single();

        if (!existingOrder) {
            return NextResponse.json({ error: 'Comanda nu există în DB' }, { status: 404 });
        }

        // Dacă e deja plătită, doar returnăm success (evităm dublarea emailurilor la refresh)
        if (existingOrder.status === 'paid' || existingOrder.status === 'completed') {
            return NextResponse.json({ success: true, message: 'Deja procesată' });
        }

        // 3. Actualizăm statusul în Supabase
        const { error: updateError } = await supabase
            .from('orders')
            .update({
                status: 'paid',
                // Putem salva și ID-ul tranzacției Stripe pentru referință
                // payment_id: sessionId 
            })
            .eq('id', orderId);

        if (updateError) {
            console.error("Eroare update DB:", updateError);
            // Nu oprim execuția, banii sunt luați, măcar să trimitem mailul
        }

        // 4. Trimitem Emailul de Confirmare
        try {
            const emailHtml = await render(
                OrderConfirmationTemplate({
                    childName: existingOrder.child_name,
                    packageName: existingOrder.package === 'premium' ? 'Agent Secret' : 'Scutul Magic',
                    price: existingOrder.amount,
                })
            );

            await resend.emails.send({
                from: 'Biroul Mosului <contact@biroulmosului.ro>',
                to: [existingOrder.parent_email],
                subject: `Plată confirmată! Comanda pentru ${existingOrder.child_name} a început! 🎅`,
                html: emailHtml,
            });

            console.log(`Email trimis către ${existingOrder.parent_email}`);

        } catch (emailError) {
            console.error("Eroare trimitere email:", emailError);
        }

        return NextResponse.json({ success: true });

    } catch (error: any) {
        console.error('Verify Error:', error);
        return NextResponse.json({ error: 'Server Error' }, { status: 500 });
    }
}