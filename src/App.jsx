/* eslint-disable no-case-declarations */
/* eslint-disable no-unused-vars */
import { useEffect, useReducer } from 'react'

import { Header } from './components/Header'
import { Main } from './components/Main'
import { StartScreen } from './components/StartScreen'
import { Error } from './components/Error'
import { Loading } from './components/Loading'
import { Questions } from './components/Questions'
import { Finish } from './components/Finish'

const MAX_SEC = 300

// 'loading', 'error', 'ready', 'active', 'finished'
const initialState = {
  data: [],
  questions: [],
  category: 'choose' /* delete */,
  status: 'loading',
  alert: false,
  index: 0,
  answer: null,
  isConfirm: false,
  score: 0,
  seconds: MAX_SEC,
}

function reducer(state, action) {
  switch (action.type) {
    case 'data':
      return { ...state, data: action.payload.categories, status: 'ready' }
    case 'category':
      const { category = 'choose', questions = [] } = state.data.find(
        q => q.category.toLowerCase() === action.payload.toLowerCase()
      )

      return {
        ...state,
        category: category.toLowerCase(),
        questions: questions,
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

    case 'answer':
      if (state.isConfirm) return { ...state }
      return { ...state, answer: action.payload }

    case 'confirm':
      console.log(state.questions[state.index].correctOption)
      return {
        ...state,
        isConfirm: true,
        score:
          state.questions[state.index].correctOption === state.answer
            ? state.score + state.questions[state.answer].points
            : state.score,
      }

    case 'next':
      const index = state.index + 1

      return {
        ...state,
        status: index === state.questions.length ? 'finished' : state.status,
        index,
        answer: null,
        isConfirm: false,
      }

    case 'timer':
      if (state.seconds === 0) return { ...state, status: 'finished' }
      return { ...state, seconds: state.seconds - 1 }

    case 'restart':
      return { ...initialState, data: state.data, status: 'ready' }
    default:
      throw new Error('Unknown type')
  }
}

function App() {
  const [
    {
      data,
      questions,
      category,
      status,
      alert,
      index,
      answer,
      isConfirm,
      score,
      seconds,
    },
    dispatch,
  ] = useReducer(reducer, initialState)

  useEffect(() => {
    fetch('./questions.json')
      .then(res => res.json())
      .then(data => dispatch({ type: 'data', payload: data }))
      .catch(() => dispatch({ type: 'error' }))
  }, [])

  return (
    <>
      <Header />
      <Main>
        {status === 'loading' && <Loading />}
        {status === 'error' && <Error />}
        {status === 'ready' && (<Finish dispatch={dispatch}/>
      
        )}
        {status === 'active' && (
          <Questions
            questions={questions}
            dispatch={dispatch}
            index={index}
            answer={answer}
            isConfirm={isConfirm}
            score={score}
            seconds={seconds}
          />
        )}
        {status === 'finished' && <Finish dispatch={dispatch} />}
      </Main>
    </>
  )
}

export default App
