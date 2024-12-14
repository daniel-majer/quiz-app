import { useQuestion } from '../contexts/QuestionsContext'

/* eslint-disable react/prop-types */
export const Options = () => {
  const { data } = useQuestion()

  return (
    <>
      {data.map(question => {
        return (
          <option
            key={crypto.randomUUID()}
            value={question.category.toLowerCase()}
          >
            {question.category}
          </option>
        )
      })}
    </>
  )
}
