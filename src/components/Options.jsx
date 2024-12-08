/* eslint-disable react/prop-types */
export const Options = ({ data }) => {
  
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
