/* eslint-disable react/prop-types */
export const Options = ({ questions }) => {
  return (
    <>
      {questions.map(question => {
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
