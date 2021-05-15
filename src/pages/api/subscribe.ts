import { NextApiRequest, NextApiResponse } from "next"
import { stripe } from "../../services/stripe"
import { getSession } from "next-auth/client"
import Stripe from "stripe"

//all request on render  we use GetStatic Props or getServerSideProps
//handle actions we use our api folder to make a request

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    //get user (nextAuth user) throught cookies
    const session = await getSession({ req })

    //create customer in stripe
    //(user !== customer ) user is from next auth and customer is in stripe
    const stripeCustomer = await stripe.customers.create({
      email: session.user.email,
      //metadata
    })

    const stripeCheckoutSession = await stripe.checkout.sessions.create({
      customer: stripeCustomer.id,
      payment_method_types: ["card"],
      billing_address_collection: "required",
      line_items: [
        {
          price: "price_1IozzOKmr745f9nvpMwVuIgV",
          quantity: 1,
        },
      ],
      mode: "subscription",
      allow_promotion_codes: true,
      success_url: process.env.STRIPE_SUCCESS_URL,
      cancel_url: process.env.STRIPE_CANCEL_URL,
    })

    return res.status(200).json({ sessionId: stripeCheckoutSession.id })
  } else {
    res.setHeader("Allow", "POST")
    res.status(405).end("Method not allowed")
  }
}
