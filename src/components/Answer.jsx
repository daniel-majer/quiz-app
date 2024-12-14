import { useQuestion } from '../contexts/QuestionsContext'
import styles from './QuestionBody.module.css'

export const Answer = ({ option, i, actualQuestion }) => {
  const { answer, isConfirm, dispatch } = useQuestion()

  return (
    <button
      onClick={() => dispatch({ type: 'answer', payload: i })}
      disabled={isConfirm && actualQuestion.correctOption !== i}
      className={`${answer === 0 || answer ? styles.colorAnswers : ''}
                    ${
                      !isConfirm && answer === i
                        ? styles.choosenAnswer
                        : answer !== actualQuestion.correctOption &&
                          answer === i &&
                          isConfirm
                        ? styles.uncorrect
                        : ''
                    }
                    ${
                      isConfirm && actualQuestion.correctOption === i
                        ? styles.correct
                        : ''
                    }
            `}
    >
      {option}
    </button>
  )
}
