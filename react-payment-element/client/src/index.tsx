import React, { useEffect, useState } from 'react'
import ReactDom from 'react-dom'
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { CheckoutForms } from './CheckoutForms';
import { Button, CssBaseline, Dialog } from '@mui/material';
import './style.css'

interface Res {
  clientSecret: string
}


const App = () => {

  const [stripeKey, setStripeKey] = useState('')
  const [clientSecret, setClientSecret] = useState('')
  const [openModal, setOpenModal] = useState(false)
  const [amount, setAmount] = useState(100)

  useEffect(() => {

    const fetchClientSecret = async () => {
      const response = await fetch('http://localhost:3001/create-payment-intent', {
        method: "POST",
        headers: { 'Content-Type': "application/json" },
        body: JSON.stringify({ clientName: "Jun Guo", amount})
      }).then(res => res.json())

      const newClientSecret = (response as Res).clientSecret

      console.log(newClientSecret);
      setClientSecret(newClientSecret)
      setStripeKey(process.env.STRIPE_PUBLIC_KEY ?? "")
    }

    fetchClientSecret()

  }, [])

  if (!stripeKey || !clientSecret) {
    return <div>missing "STRIPE_PUBLIC_KEY" in .env file or unable to get clientSecret</div>
  } else {
    return <div className="container">
      <Button variant="contained" onClick={()=> setOpenModal(true)} >Pay Now</Button>

      <Dialog open={openModal} onClose={() => { setOpenModal(false) }}>
        <Elements
          options={{ clientSecret }}
          stripe={loadStripe(stripeKey)}>

          <CheckoutForms callback={(status) => {
            if (status === 'succeeded') {
              setOpenModal(false)
              console.log('payment is:', status, ', close the modal');
            } else {
              console.log('payment is:', status);
            }
          }} />
        </Elements>
      </Dialog>
    </div>
  }

}


ReactDom.render(
  <>
    <CssBaseline />
    <App />,
  </>,
  document.querySelector('#root')
)

