import express from 'express'
import { Stripe } from 'stripe'
import dotenv from 'dotenv'

dotenv.config() // load .env file

const app = express()
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY ?? "", { apiVersion: "2020-08-27" })


app.get('/', (req, res) => {
  res.send('helloworld')
})

app.post("/create-payment-intent", async (req, res) => {
  // const { items } = req.body;

  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    metadata: {
      doctorName: 'Jun Guo',
    },
    amount: 100, // client payment amount ,100 = 1.00 CAD
    currency: "cad",
    automatic_payment_methods: {
      enabled: true,
    },
  });

  res.send({
    clientSecret: paymentIntent.client_secret,
  });
});

app.listen(3001, () => {
  console.log(`Example app listening on port 3001`)
})