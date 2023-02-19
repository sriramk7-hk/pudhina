import Head from 'next/head'
import styles from '@/styles/Home.module.css'
import UploadFile from '@/pages/UploadFile'
import NavBar from 'components/navbar'
export default function Home() {
  return (
    <>
      <Head>
        <title>Pudhina</title>
        <meta name="description" content="Platform to mint NFTs" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <NavBar />
        <UploadFile/>
      </main>
    </>
  )
}
