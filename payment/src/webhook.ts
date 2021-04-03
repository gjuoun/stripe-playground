// Set your secret key. Remember to switch to your live secret key in production.
// See your keys here: https://dashboard.stripe.com/account/apikeys
import dotenv from 'dotenv';
import express from 'express';
import Stripe from 'stripe';
dotenv.config()

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET ?? ""
const stripeApiKey = process.env.STRIPE_API_KEY ?? ""

const stripe = new Stripe(stripeApiKey, { apiVersion: "2020-08-27", typescript: true })
const app = express();


const fulfillOrder = (session: any) => {
  // TODO: fill me in
  console.log("Fulfilling order", session);
}

app.post('/webhook', express.json(), (request, response, next) => {
  const payload = request.body;
  
  const stripeSignature = request.headers['stripe-signature'];

  let event
  try {
    //verify the event by using signature
    event = stripe.webhooks.constructEvent(payload, stripeSignature!, webhookSecret);
  } catch (err) {
    return response.status(400).send(`Webhook Error: ${err.message}`);
  }

  response.status(200);
});

app.listen(4242, () => console.log('Running on port 4242'));