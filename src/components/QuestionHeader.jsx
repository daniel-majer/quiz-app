import styles from './QuestionHeader.module.css'
import { useQuestion } from '../contexts/QuestionsContext'

export const QuestionHeader = () => {
  const { questions, index, score } = useQuestion()

  const maxScore = questions.reduce((acc, curr) => {
    return curr.points + acc
  }, 0)

  return (
    <header className={styles.questionsHeader}>
      <progress max={questions.length} value={index + 1}></progress>
      <div>
        <p>
          Question <strong>{index + 1}</strong> / {questions.length}
        </p>
        <p>
          {score}/{maxScore}
        </p>
      </div>
    </header>
  )
}
