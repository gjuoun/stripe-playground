import React, { useEffect, useState } from 'react'
import { PaymentElement, CardNumberElement, CardCvcElement, CardExpiryElement, useStripe, useElements } from "@stripe/react-stripe-js"
import { PaymentIntent } from '@stripe/stripe-js'
import { Button } from '@mui/material'

interface Props {
  callback: (status: PaymentIntent.Status) => void,
}

export const CheckoutForms = ({ callback }: Props) => {

  const [message, setMessage] = useState('')
  const stripe = useStripe()
  const elements = useElements()

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }
    const paymentIntentResult = await stripe.confirmPayment({
      elements,
      redirect: "if_required"
    })

    if (paymentIntentResult.error) {
      setMessage('Error processing your card')
    } else {
      const status = paymentIntentResult.paymentIntent?.status ?? ""

      setMessage(status)

      callback(status)
    }
  }



  return <div className="container">
    <form onSubmit={handleSubmit}>
      <PaymentElement id="payment-element" />

      <p>{message}</p>

      <Button variant="outlined" color="success" type="submit" disabled={!stripe}>Pay Now</Button>
    </form>
  </div>
}