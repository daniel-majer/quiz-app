import { useQuestion } from '../contexts/QuestionsContext'
import { useLocalStorage } from '../hooks/useLocalStorage'
import Button from './Button'
import styles from './Finish.module.css'

export const Finish = () => {
  const { dispatch, score, maxScore } = useQuestion()

  let emoji

  const [storedValue] = useLocalStorage('highscore', score)

  const percentage = Math.ceil((score / maxScore) * 100)

  if (percentage === 100) emoji = '🥇'
  if (percentage >= 80 && percentage < 100) emoji = '🎉'
  if (percentage >= 50 && percentage < 80) emoji = '🙃'
  if (percentage >= 0 && percentage < 50) emoji = '🤨'
  if (percentage === 0) emoji = '🤦‍♂️'

  return (
    <>
      <p className={styles.score}>
        {emoji} You scored {score} out of {maxScore} ({percentage}%)
      </p>
      <p className={styles.highScore}>(Highscore: {storedValue} points)</p>
      <Button type={'restart'} onclick={() => dispatch({ type: 'restart' })}>
        <strong>restart</strong>
      </Button>
    </>
  )
}
