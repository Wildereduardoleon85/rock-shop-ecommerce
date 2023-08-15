import styles from './Footer.module.scss'

function Footer() {
  return (
    <footer className={styles.footer}>
      <p>ROCKSHOP &copy; {new Date().getFullYear()}</p>
    </footer>
  )
}

export default Footer
