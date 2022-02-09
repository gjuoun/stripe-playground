import express from 'express'
import { Stripe } from 'stripe'
import dotenv from 'dotenv'
import cors from 'cors'

dotenv.config() // load .env file

const app = express()
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY ?? "", { apiVersion: "2020-08-27" })

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
  res.send('helloworld')
})

app.post("/create-payment-intent", async (req, res) => {
  const clientName = req.body.clientName;
  const amount = req.body.amount;
  console.log(req.body);
  
  if (!clientName) {
    res.send({ error: "missing clientName in the body" })
  } else {

    // Create a PaymentIntent with the order amount and currency
    const paymentIntent = await stripe.paymentIntents.create({
      metadata: {
        clientName
      },
      amount, // client payment amount ,100 = 1.00 CAD
      currency: "cad",
      automatic_payment_methods: {
        enabled: true,
      },
    });

    res.send({
      clientSecret: paymentIntent.client_secret,
    });
  }


});

app.listen(3001, () => {
  console.log(`Example app listening on port 3001`)
})