/* eslint-disable no-constant-binary-expression */
/* eslint-disable react/prop-types */

import { useEffect } from 'react'
import styles from './Questions.module.css'

export const Questions = ({
  questions,
  dispatch,
  index,
  answer,
  isConfirm,
  score,
  seconds,
}) => {
  const actualQuestion = questions[index]

  useEffect(
    function () {
      const timer = setInterval(() => dispatch({ type: 'timer' }), 1000)

      return () => clearInterval(timer)
    },
    [dispatch]
  )

  const hours = Math.floor(seconds / 60)
  const remainingSecs = seconds % 60

  const maxScore = questions.reduce((acc, curr) => {
    return curr.points + acc
  }, 0)

  return (
    <>
      <header className={styles.questionsHeader}>
        <progress max={questions.length} value={10}></progress>
        <div>
          <p>
            Question <strong>{index + 1}</strong> / {questions.length}
          </p>
          <p>
            {score}/{maxScore}
          </p>
        </div>
      </header>

      <div className={styles.questionName}>
        <h4>{actualQuestion.question}</h4>
        <div>
          {actualQuestion.options.map((option, i) => {
            return (
              <button
                key={i}
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
          })}
        </div>
      </div>

      <footer className={styles.questionFooter}>
        <p>
          0{hours}:{remainingSecs < 10 ? '0' + remainingSecs : remainingSecs}
        </p>
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
      </footer>
    </>
  )
}
