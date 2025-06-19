// src/api/order/controllers/order.ts

import { factories } from '@strapi/strapi';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2025-05-28.basil',
});

export default factories.createCoreController('api::order.order', ({ strapi }) => ({
  async create(ctx) {
    const { products, categoryid } = ctx.request.body.data;

    const lineItems = products.map((product) => ({
      price_data: {
        currency: 'usd',
        product_data: {
          name: product.productName,
        },
        unit_amount: Math.round(product.price * 100),
      },
      quantity: 1,
    }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items: lineItems,
      success_url: 'http://localhost:3000/success',
      cancel_url: 'http://localhost:3000/cancel',
    });

    await strapi.entityService.create('api::order.order', {
      data: {
        categoryid,
        products,
      },
    });

    return { stripeSession: session }; // 👈 Esto es lo que esperas en el front
  }
}));
