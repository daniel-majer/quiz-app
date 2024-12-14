import styles from './QuestionHeader.module.css'
import { useQuestion } from '../contexts/QuestionsContext'

export const QuestionHeader = () => {
  const { questions, index, score, maxScore } = useQuestion()

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
