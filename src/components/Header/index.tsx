import React from "react"

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
      </div>
    </header>
  )
}
