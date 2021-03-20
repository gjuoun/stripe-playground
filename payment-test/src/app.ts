import dotenv from 'dotenv';
import Stripe from 'stripe'
import express from 'express'

dotenv.config()

const apiKey = process.env.STRIPE_API_KEY ?? "";
const stripe = new Stripe(apiKey, { apiVersion: "2020-08-27", typescript: true })


const createCustomer = async () => {
  const params: Stripe.CustomerCreateParams = {
    description: 'test customer',
  }

  const customer: Stripe.Customer = await stripe.customers.create(params)
  console.log(customer.id);
  console.log(customer)
}


/* ------------------------------ start the app ----------------------------- */

const app = express()

app.use(express.static("."));
app.use(express.json())

app.post("/create-payment-intent", async (req, res) => {
  const { items } = req.body;
  // Create a PaymentIntent with the order amount and currency
  try{ 
    const paymentIntent = await stripe.paymentIntents.create({
      amount: 19999,
      currency: "usd",
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