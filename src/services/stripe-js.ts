import { loadStripe } from "@stripe/stripe-js"

//stripe has two SDK one for front and other for backend

export async function getStripeJs() {
  const stripeJs = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY)

  return stripeJs
}
