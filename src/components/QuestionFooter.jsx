import { useEffect } from 'react'
import { useQuestion } from '../contexts/QuestionsContext'
import styles from './QuestionFooter.module.css'

export const QuestionFooter = () => {
  const { questions, dispatch, index, answer, isConfirm, seconds } =
    useQuestion()

  useEffect(
    function () {
      const timer = setInterval(() => dispatch({ type: 'timer' }), 1000)

      return () => clearInterval(timer)
    },
    [dispatch]
  )

  const hours = Math.floor(seconds / 60)
  const remainingSecs = seconds % 60

  return (
    <footer className={styles.questionFooter}>
      <p>
        0{hours}:{remainingSecs < 10 ? '0' + remainingSecs : remainingSecs}
      </p>
      {
        <div>
          <button
            disabled={!(answer === 0 || answer) || isConfirm}
            className={answer || answer === 0 ? styles.confirm : ''}
            onClick={() => dispatch({ type: 'confirm' })}
          >
            confirm
          </button>
          <button
            disabled={!isConfirm}
            onClick={() => dispatch({ type: 'next' })}
          >
            {index === questions.length - 1 ? 'finish' : 'next'}
          </button>
        </div>
      }
    </footer>
  )
}
