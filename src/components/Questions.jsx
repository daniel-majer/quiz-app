/* eslint-disable react/prop-types */
import styles from './Questions.module.css'

export const Questions = ({
  questions,
  dispatch,
  index,
  answer,
  confirmed,
}) => {
  return (
    <>
      <header className={styles.questionsHeader}>
        <progress max={questions.length} value={10}></progress>
        <div>
          <p>
            Question <strong>{index + 1}</strong> / {questions.length}
          </p>
          <p>0/280</p>
        </div>
      </header>

      <div className={styles.questionName}>
        <h4>{questions[index].question}</h4>
        <div>
          {questions[index].options.map((option, i) => {
            return (
              <button
                key={i}
                onClick={() => dispatch({ type: 'answer', payload: i })}
                disabled={answer && true}
                className={`${answer === 0 || answer ? styles.colorAnswers : ''}
                ${answer === i ? styles.choosenAnswer : ''}
                ${confirmed === i ? styles.trueAnswer : ''}
        `}
              >
                {option}
              </button>
            )
          })}
        </div>
      </div>

      <footer className={styles.questionFooter}>
        <p>timer</p>
        <div>
          <button
            className={answer /* || answer === 0 */ ? styles.confirm : ''}
            onClick={() => dispatch({ type: 'confirm' })}
          >
            confirm
          </button>
          <button onClick={() => dispatch({ type: 'next' })}>next</button>
        </div>
      </footer>
    </>
  )
}
