import { useQuestion } from '../contexts/QuestionsContext'
import { Answer } from './Answer'
import styles from './QuestionBody.module.css'

export const QuestionBody = () => {
  const { questions, index } = useQuestion()
  const actualQuestion = questions[index]

  return (
    <div className={styles.questionName}>
      <h4>{actualQuestion.question}</h4>
      <div>
        {actualQuestion.options.map((option, i) => {
          return (
            <Answer
              key={i}
              option={option}
              i={i}
              actualQuestion={actualQuestion}
            />
          )
        })}
      </div>
    </div>
  )
}
