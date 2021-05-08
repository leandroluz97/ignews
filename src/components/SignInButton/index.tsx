import React from "react"
import { FaGithub } from "react-icons/fa"
import { FiX } from "react-icons/fi"
import styles from "./styles.module.scss"

export const SignInButton = () => {
  const isUserLoggedIn = true
  return isUserLoggedIn ? (
    <button type='button' className={styles.SignInButton}>
      <FaGithub color='#04d361' />
      Leandro da Luz
      <FiX color='#737380' className={styles.closeIcons} />
    </button>
  ) : (
    <button type='button' className={styles.SignInButton}>
      <FaGithub color='#eba417' />
      Sign in with GitHub
    </button>
  )
}
