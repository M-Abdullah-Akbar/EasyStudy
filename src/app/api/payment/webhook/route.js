import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { db } from '@/db/index';
import { usersTable } from '@/db/schema';
import { eq } from 'drizzle-orm';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const webhookSecret = process.env.STRIPE_WEBHOOK_KEY;

export async function POST(req) {
  try {
    const body = await req.text();
    const signature = req.headers.get('stripe-signature');

    let event;
    try {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
    } catch (err) {
      console.error('Webhook signature verification failed:', err.message);
      return NextResponse.json({ error: 'Webhook signature verification failed' }, { status: 400 });
    }

    // Handle the event
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object;

        // Update user's membership status and customer ID
        await db
          .update(usersTable)
          .set({
            isMember: true,
            customerId: session.customer
          })
          .where(eq(usersTable.email, session.customer_email));

        break;
      }
      case 'customer.subscription.updated': {
        const subscription = event.data.object;

        // Update user's membership status when subscription is updated
        await db
          .update(usersTable)
          .set({
            isMember: false
          })
          .where(eq(usersTable.customerId, subscription.customer));

        break;
      }
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Error processing webhook:', error);
    return NextResponse.json(
      { error: 'Webhook handler failed' },
      { status: 500 }
    );
  }
} 