import Stripe from "stripe";
import dotenv from "dotenv";
import express from "express";
import path from "path";

dotenv.config();

const app = express();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {apiVersion: "2020-08-27"});

console.log(path.join(__dirname,'./assets'));

app.use(express.static(path.join(__dirname,'./assets')));

const YOUR_DOMAIN = 'http://localhost:4242';

app.post('/create-checkout-session', async (req, res) => {
  const session = await stripe.checkout.sessions.create({
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
