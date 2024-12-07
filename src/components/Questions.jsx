/* eslint-disable react/prop-types */
import styles from './Questions.module.css'

export const Questions = ({ questions, dispatch, index, answer }) => {
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
                onClick={() => dispatch({ type: 'answer', payload: option })}
                disabled={false}
                className={`${answer ? styles.questionAnswer : ''}
                ${answer === option ? styles.choosenAnswer : ''}
                ${answer === i ? styles.trueAnswer : ''}
                
`}

                /*   className={`${answer ?? styles.questionAnswer} 
                ${answer === i ? styles.choosenAnswer : ''}`} */
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
            className={answer || answer === 0 ? styles.confirm : ''}
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
