/* eslint-disable react/prop-types */
import Button from './Button'
import styles from './Finish.module.css'

export const Finish = ({ dispatch, score, questions }) => {
  const maxScore = questions.reduce((acc, curr) => {
    return curr.points + acc
  }, 0)

  const percentage = Math.floor((score / maxScore) * 100)
  return (
    <>
      <p className={styles.score}>
        🤨 You scored {score} out of {maxScore} ({percentage}%)
      </p>
      <p className={styles.highScore}>(Highscore: 100 points)</p>
      <Button type={'restart'} onclick={() => dispatch({ type: 'restart' })}>
        <strong>restart</strong>
      </Button>
    </>
  )
}
