import React from "react"
import { SignInButton } from "../SignInButton"

import styles from "./styles.module.scss"

export const Header = () => {
  return (
    <header className={styles.headerContainer}>
      <div className={styles.headerContent}>
        <img src='/images/logo.svg' alt='ig.news' />

        <nav>
          <a href='Home' className={styles.active}>
            Home
          </a>
          <a href='Home'>Posts</a>
        </nav>

        <SignInButton />
      </div>
    </header>
  )
}
