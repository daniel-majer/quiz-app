/* eslint-disable react/prop-types */
import { useQuestion } from '../contexts/QuestionsContext'
import Button from './Button'

import { Options } from './Options'
import { Select } from './Select'
import styles from './StartScreen.module.css'

export const StartScreen = () => {
  const { dispatch, alert } = useQuestion()

  return (
    <div className={styles.start}>
      <h2>Welcome to The SmartQuest Game!</h2>
      <h3>15 questions to test your knowledges</h3>

      <Select />

      <Button onclick={() => dispatch({ type: 'play' })}>
        <strong>Let&#39;s start!</strong>
      </Button>

      {alert && <p>Please select category.</p>}
    </div>
  )
}
