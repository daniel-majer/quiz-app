/* eslint-disable react/prop-types */
import Button from './Button'
import styles from './Finish.module.css'

export const Finish = ({ dispatch }) => {
  return (
    <>
      <p className={styles.score}>🤨 You scored 100 out of 280 (36%)</p>
      <p className={styles.highScore}>(Highscore: 100 points)</p>
      <Button type={'restart'} onclick={() => dispatch({ type: 'restart' })}>
        <strong>restart</strong>
      </Button>
    </>
  )
}
