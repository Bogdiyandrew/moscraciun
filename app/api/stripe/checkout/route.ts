import { NextResponse } from 'next/server';
import Stripe from 'stripe';

// Inițializare sigură Stripe
// Dacă nu există cheie, nu crăpăm aplicația direct, dar vom da eroare la request
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
    typescript: true,
    // Nu specificăm apiVersion pentru a folosi default-ul instalat și a evita erorile de tip
});

export async function POST(req: Request) {
    try {
        // 1. Verificăm Cheia Secretă
        if (!process.env.STRIPE_SECRET_KEY) {
            console.error('❌ EROARE CRITICĂ: Lipsește STRIPE_SECRET_KEY din .env.local');
            return NextResponse.json(
                { error: 'Server configuration error: Missing Stripe Key' },
                { status: 500 }
            );
        }

        const body = await req.json();
        const { orderId, packageType, childName, parentEmail } = body;

        console.log(`🚀 Inițiere plată pentru comanda #${orderId} (${packageType})`);

        // 2. Stabilim prețul (Hardcoded pe server pentru securitate)
        let amount = 4900; // 49.00 RON
        let productName = 'Pachet Scutul Magic (Video)';

        if (packageType === 'premium') {
            amount = 8900; // 89.00 RON
            productName = 'Pachet Agent Secret (Video + Foto)';
        }

        // 3. Creăm sesiunea Stripe
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [
                {
                    price_data: {
                        currency: 'ron',
                        product_data: {
                            name: productName,
                            description: `Video personalizat pentru ${childName}`,
                        },
                        unit_amount: amount,
                    },
                    quantity: 1,
                },
            ],
            mode: 'payment',
            customer_email: parentEmail,
            // Folosim URL-ul din mediu sau localhost ca fallback
            success_url: `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/succes?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/#comanda`,
            metadata: {
                orderId: orderId,
            },
        });

        console.log('✅ Sesiune Stripe creată cu succes:', session.url);
        return NextResponse.json({ url: session.url });

    } catch (error: any) {
        console.error('❌ EROARE STRIPE CHECKOUT:', error);
        return NextResponse.json(
            { error: error.message || 'Internal Server Error' },
            { status: 500 }
        );
    }
}