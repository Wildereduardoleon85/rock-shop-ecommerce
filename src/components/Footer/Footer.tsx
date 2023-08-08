import styles from './Footer.module.scss'

function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className={styles.footer}>
      <p>ROCKSHOP &copy; {currentYear}</p>
    </footer>
  )
}

export default Footer
