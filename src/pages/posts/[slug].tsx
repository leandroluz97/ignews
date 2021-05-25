import { GetServerSideProps } from "next"
import { getSession } from "next-auth/client"
import Head from "next/head"
import { RichText } from "prismic-dom"
import React from "react"
import { getPrismicClient } from "../../services/prismic"
import styles from "./post.module.scss"

interface PostProps {
  post: {
    title: string
    slug: string
    content: string
    updatedAt: string
  }
}

export default function Post({ post }: PostProps) {
  return (
    <>
      <Head>
        <title>{post.title} | Ignews</title>
      </Head>

      <main className={styles.post}>
        <article className={styles.postContent}>
          <h1>{post.title}</h1>
          <time>{post.updatedAt}</time>
          <div dangerouslySetInnerHTML={{ __html: post.content }} />
        </article>
      </main>
    </>
  )
}

//all getStaticProps is unprotected
export const getServerSideProps: GetServerSideProps = async ({
  req,
  params,
}) => {
  //get authSession
  const session = await getSession({ req })

  if (!session?.activeSubscription) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    }
  }

  //get the slug from url
  const { slug } = params

  //conection to prismic
  const prismic = getPrismicClient(req)

  //get sigle post based on the slug
  const response = await prismic.getByUID("publication", String(slug), {})

  const post = {
    slug,
    title: RichText.asText(response.data.title),
    content: RichText.asText(response.data.content),
    updatedAt: new Date(response.last_publication_date).toLocaleDateString(
      "pt-BR",
      {
        day: "2-digit",
        month: "long",
        year: "numeric",
      }
    ),
  }

  return {
    props: {
      post,
    },
  }
}
