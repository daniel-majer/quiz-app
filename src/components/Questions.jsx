/* eslint-disable react/prop-types */
import styles from './Questions.module.css'

export const Questions = ({ questions, category, dispatch, index, answer }) => {
  const { /* category: cat,  */ questions: quests } = questions.find(
    q => q.category.toLowerCase() === category
  )

  console.log(answer)
  return (
    <>
      <header className={styles.questionsHeader}>
        <progress max={quests.length} value={10}></progress>
        <div>
          <p>
            Question <strong>1</strong> / 15
          </p>
          <p>0/280</p>
        </div>
      </header>

      <div className={styles.questionName}>
        <h4>{quests[index].question}</h4>
        <div>
          {quests[index].options.map((option, i) => {
            return (
              <button
                key={i}
                onClick={() => dispatch({ type: 'answer', payload: option })}
                className={`${answer ? styles.questionAnswer : ''} ${
                  answer === option && styles.choosenAnswer
                }`}
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
          <button>confirm</button>
          <button onClick={() => dispatch({ type: 'next' })}>next</button>
        </div>
      </footer>
    </>
  )
}
