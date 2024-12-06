/* eslint-disable no-unused-vars */
import { useEffect, useReducer } from 'react'
import { Header } from './components/Header'
import { Main } from './components/Main'
import { StartScreen } from './components/StartScreen'
import { Error } from './components/Error'
import { Loading } from './components/Loading'
import { Questions } from './components/Questions'

// 'loading', 'error', 'ready', 'active', 'finished'
const initialState = {
  questions: [],
  category: 'choose',
  status: 'loading',
  alert: false,
  index: 0,
  answer: '',
}

function reducer(state, action) {
  switch (action.type) {
    case 'questions':
      return { ...state, questions: action.payload.categories, status: 'ready' }
    case 'category':
      return {
        ...state,
        category: action.payload,
        alert: state.alert === true ? false : false,
      }
    case 'error':
      return { ...state, status: 'error' }
    case 'play':
      if (state.category === 'choose')
        return {
          ...state,
          alert: state.category === 'choose' ? true : false,
        }

      return {
        ...state,
        status: 'active',
      }
    case 'next':
      return { ...state, index: state.index + 1, answer: '' }
    case 'answer':
      return { ...state, answer: action.payload }
    default:
      throw new Error('Unknown type')
  }
}

function App() {
  const [{ questions, category, status, alert, index, answer }, dispatch] =
    useReducer(reducer, initialState)

  useEffect(() => {
    fetch('./questions.json')
      .then(res => res.json())
      .then(data => dispatch({ type: 'questions', payload: data }))
      .catch(() => dispatch({ type: 'error' }))
  }, [])

  return (
    <>
      <Header />
      <Main>
        {status === 'loading' && <Loading />}
        {status === 'error' && <Error />}
        {status === 'ready' && (
          <StartScreen
            questions={questions}
            category={category}
            dispatch={dispatch}
            alert={alert}
          />
        )}
        {status === 'active' && (
          <Questions
            questions={questions}
            category={category}
            dispatch={dispatch}
            index={index}
            answer={answer}
          />
        )}
      </Main>
    </>
  )
}

export default App
