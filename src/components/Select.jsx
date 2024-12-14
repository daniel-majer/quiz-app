import { useQuestion } from '../contexts/QuestionsContext'
import { Options } from './Options'

export const Select = () => {
  const { dispatch, category } = useQuestion()
  return (
    <select
      value={category}
      onChange={e => dispatch({ type: 'category', payload: e.target.value })}
    >
      <option value='choose'>Choose category</option>
      <Options />
    </select>
  )
}
