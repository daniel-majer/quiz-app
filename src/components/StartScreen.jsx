/* eslint-disable react/prop-types */
import { useQuestion } from '../contexts/QuestionsContext'
import Button from './Button'
import { Options } from './Options'
import styles from './StartScreen.module.css'

export const StartScreen = () => {
  const { dispatch, data, category, alert } = useQuestion()

  return (
    <div className={styles.start}>
      <h2>Welcome to The SmartQuest Game!</h2>
      <h3>15 questions to test your knowledges</h3>
      <select
        value={category}
        onChange={e => dispatch({ type: 'category', payload: e.target.value })}
      >
        <option value='choose'>Choose category</option>
        <Options data={data} />
      </select>

      <Button onclick={() => dispatch({ type: 'play' })}>
        <strong>Let&#39;s start!</strong>
      </Button>

      {alert && <p>Please select category.</p>}
    </div>
  )
}
