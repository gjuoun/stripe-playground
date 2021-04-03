import dotenv from 'dotenv';
import Stripe from 'stripe'


(
  async () => {
    dotenv.config()

    const apiKey = process.env.STRIPE_API_KEY ?? "";
    const stripe = new Stripe(apiKey, { apiVersion: "2020-08-27", typescript: true })

    async function getPaymentMethods() {
      const paymentId = `pm_1IXLIcLJ7Drw2pgiDgbN6xuR`
      const methods = await stripe.paymentMethods.retrieve(paymentId)
      return methods
    }

    console.log(await getPaymentMethods());

  }
)()

