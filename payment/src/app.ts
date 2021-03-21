import dotenv from 'dotenv';
import Stripe from 'stripe'
import express from 'express'
import path from 'path'

dotenv.config()

const apiKey = process.env.STRIPE_SECRET_KEY ?? "";
const stripe = new Stripe(apiKey, { apiVersion: "2020-08-27", typescript: true })


const createCustomer = async () => {
  const params: Stripe.CustomerCreateParams = {
    description: 'auto created by graphql server',
    email: "gjuoun@gmail.com",
    metadata: {
      userId: "userId-1234"
    },
  }

  const customer: Stripe.Customer = await stripe.customers.create(params)
  console.log(customer)
}




/* ------------------------------ start the app ----------------------------- */

const app = express()

app.use(express.static(path.join(__dirname, "./assets")));
app.use(express.json())

app.post("/create-customer", async (req, res) => {
  const params: Stripe.CustomerCreateParams = {
    description: 'auto created by graphql server',
    email: "gjuoun@gmail.com",
    metadata: {
      userId: "userId-1234"
    },
  }

  const customer: Stripe.Customer = await stripe.customers.create(params)
  res.send(customer)
})


app.post("/create-payment-intent", async (req, res) => {
  const { items } = req.body;
  // Create a PaymentIntent with the order amount and currency
  try{ 
    const paymentIntent = await stripe.paymentIntents.create({
      amount: 19999,
      currency: "cad",
      customer: `cus_J2WqKGT0GEWsQY`
    });
    res.send({
      clientSecret: paymentIntent.client_secret
    });
  }
  catch(e){
    console.log(e)
  }
});




app.listen(4000, () => {
  console.log("server running on port 4000")
})