import React, { useEffect, useState } from 'react'
import ReactDom from 'react-dom'
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { CheckoutForms } from './CheckoutForms';


const App = () => {

  const [stripeKey, setStripeKey] = useState('')

  useEffect(() => {
    setStripeKey(process.env.STRIPE_PUBLIC_KEY ?? "")
  })

  if(!stripeKey){
    return <div>You need to have "STRIPE_PUBLIC_KEY" in .env file</div>
  }else{
    return <Elements stripe={loadStripe(stripeKey)}>
      <CheckoutForms/>
    </Elements>
  }

}


ReactDom.render(
  <App />,
  document.querySelector('#root')
)

