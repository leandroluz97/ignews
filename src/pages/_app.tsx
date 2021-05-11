import { AppProps } from "next/app"
import { Header } from "../components/Header"
import "../styles/global.scss"
import { Provider as NextAuthPRovider } from "next-auth/client"

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <NextAuthPRovider session={pageProps.session}>
      <Header />
      <Component {...pageProps} />
    </NextAuthPRovider>
  )
}

export default MyApp
