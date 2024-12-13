import { useQuestion } from '../contexts/QuestionsContext'
import { useLocalStorage } from '../hooks/useLocalStorage'
import Button from './Button'
import styles from './Finish.module.css'

export const Finish = () => {
  const { dispatch, score, questions } = useQuestion()

  const [storedValue] = useLocalStorage('highscore', score)

  const maxScore = questions.reduce((acc, curr) => {
    return curr.points + acc
  }, 0)

  const percentage = Math.floor((score / maxScore) * 100)

  return (
    <>
      <p className={styles.score}>
        🤨 You scored {score} out of {maxScore} ({percentage}%)
      </p>
      <p className={styles.highScore}>(Highscore: {storedValue} points)</p>
      <Button type={'restart'} onclick={() => dispatch({ type: 'restart' })}>
        <strong>restart</strong>
      </Button>
    </>
  )
}
