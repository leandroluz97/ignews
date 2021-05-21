import { useSession, signIn } from "next-auth/client"
import React from "react"
import { api } from "../../services/api"
import { getStripeJs } from "../../services/stripe-js"
import styles from "./styles.module.scss"

interface SubscribeButtonProps {
  priceId: string
}
export const SubscribeButton = ({ priceId }: SubscribeButtonProps) => {
  const [session] = useSession()

  async function handleSubscribe() {
    //if not login redirect to signin
    if (!session) {
      signIn("github")
      return
    }

    try {
      //checkout session
      const response = await api.post("/subscribe")
      const { sessionId } = response.data

      const stripe = await getStripeJs()

      stripe.redirectToCheckout({ sessionId })
    } catch (error) {
      alert(error.message)
    }
  }
  return (
    <button
      type='button'
      className={styles.SubscribeButton}
      onClick={handleSubscribe}
    >
      Subscribe now
    </button>
  )
}
