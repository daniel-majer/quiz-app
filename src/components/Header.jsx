import styles from './Header.module.css'

export const Header = () => {
  return (
    <header className={styles.header}>
      <img src='logo.png' alt='Logo' />
      <h1>SmartQuest Game</h1>
    </header>
  )
}
