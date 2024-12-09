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

// 'loading', 'error', 'ready', 'active', 'finished'
const initialState = {
  data: [],
  questions: [],
  category: 'choose', /* delete */
  status: 'loading', 
  alert: false,
  index: 0,
  answer: null,
  confirmed: null,
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
      console.log(state.questions, state.data)
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
      return { ...state, answer: action.payload }

    case 'confirm':
      const answer = state.questions[state.index].correctOption

      console.log(answer === state.answer)

      return {
        ...state,
        confirmed: answer,
        answer: '',
      }

    case 'next':
      const index = state.index + 1

      return {
        ...state,
        status: index === state.questions.length ? 'finished' : state.status,
        index,
        tempAnswer: '',
      }
    default:
      throw new Error('Unknown type')
  }
}

function App() {
  const [
    { data, questions, category, status, alert, index, answer, confirmed },
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
        {status === 'ready' && (
          <StartScreen
            data={data}
            category={category}
            dispatch={dispatch}
            alert={alert}
          />
        )}
        {status === 'active' && (
          <Questions
            questions={questions}
            dispatch={dispatch}
            index={index}
            answer={answer}
            confirmed={confirmed}
          />
        )}
        {status === 'finished' && <Finish />}
      </Main>
    </>
  )
}

export default App
