const Stripe = require('stripe');
const dotenv = require('dotenv');
const express = require('express');
const app = express();
const stripeApp = Stripe(process.env.STRIPE_PUBLIC_KEY);

app.use(express.static('.'));
const YOUR_DOMAIN = 'http://localhost:4242';
app.post('/create-checkout-session', async (req, res) => {
  const session = await stripeApp.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [
      {
        price_data: {
          currency: 'usd',
          product_data: {
            name: 'Stubborn Attachments',
            images: ['https://i.imgur.com/EHyR2nP.png'],
          },
          unit_amount: 2000,
        },
        quantity: 1,
      },
    ],
    mode: 'payment',
    success_url: `${YOUR_DOMAIN}/success.html`,
    cancel_url: `${YOUR_DOMAIN}/cancel.html`,
  });
  res.json({ id: session.id });
});
app.listen(4242, () => console.log('Running on port 4242'));