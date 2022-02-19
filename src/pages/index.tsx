import Head from 'next/head'
import BannerLogin from '../components/BannerLogin'
import LoginBox from '../components/LoginBox'

import styles from './home.module.scss'

export default function Home() {
  return (
    <>
      <Head>
        <title>Chat</title>
      </Head>
      <main className={styles.contentWrapper}>
        <LoginBox />
        <BannerLogin />
      </main>
    </>
  )
}
