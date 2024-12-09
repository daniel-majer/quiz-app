/* eslint-disable react/prop-types */
import { Options } from './Options'
import styles from './StartScreen.module.css'

export const StartScreen = ({ data, category, dispatch, alert }) => {
  return (
    <div className={styles.start}>
      <h2>Welcome to The React Quiz!</h2>
      <h3>15 questions to test your skills</h3>
      <select
        value={category}
        onChange={e => dispatch({ type: 'category', payload: e.target.value })}
      >
        <option value='choose'>Choose category</option>
        <Options data={data} />
      </select>
      <button onClick={() => dispatch({ type: 'play' })}>
        <strong>Let&#39;s start!</strong>
      </button>
      {alert && <p>Please select category.</p>}
    </div>
  )
}
