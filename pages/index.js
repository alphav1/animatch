import styles from '../styles/Home.module.css'
import Link from 'next/link'

//home page, for the welcome
export default function Home() {
  return (
    <div className={styles.container}>
      <p className={styles.title}>animatch</p>
      <Link href="/input"> this takes you to the next page</Link>
    </div>
  )
}