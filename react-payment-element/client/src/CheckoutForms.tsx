import React from 'react'
import './CheckoutForms.css'
import { CardNumberElement, CardCvcElement, CardExpiryElement, useStripe, useElements, CardElement } from "@stripe/react-stripe-js"
export const CheckoutForms = () => {

  const stripe = useStripe()
  const elements = useElements()

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }
    const payload = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardNumberElement)!,
    });

    console.log("[PaymentResponse]", payload);
  }




  return <div className="container">
    <form onSubmit={handleSubmit}>
      <CardNumberElement className='input-wrapper' />
      <CardExpiryElement className='input-wrapper' />
      <CardCvcElement className='input-wrapper' />

      <button type="submit" disabled={!stripe}>Pay Now</button>
    </form>
  </div>
}