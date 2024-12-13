import { createContext, useContext, useReducer } from 'react'

const QuestionContext = createContext()

const MAX_SEC = 300

// 'loading', 'error', 'ready', 'active', 'finished'
const initialState = {
  data: [],
  questions: [],
  category: 'choose',
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
      
    case 'category': {
      const findItem = state.data.find(
        q => q.category.toLowerCase() === action.payload.toLowerCase()
      ) || { category: 'choose', questions: [] }

      const { category, questions } = findItem
      return {
        ...state,
        category: category.toLowerCase(),
        questions: questions,
        alert: state.alert === true ? false : false,
      }
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

    case 'next': {
      const index = state.index + 1

      return {
        ...state,
        status: index === state.questions.length ? 'finished' : state.status,
        index,
        answer: null,
        isConfirm: false,
      }
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

function QuestionsProvider({ children }) {
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
  return (
    <QuestionContext.Provider
      value={{
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
        dispatch,
      }}
    >
      {children}
    </QuestionContext.Provider>
  )
}

function useQuestion() {
  const context = useContext(QuestionContext)
  if (context === undefined)
    throw new Error('PostContext was used outside of the PostProvider')
  return context
}

export { QuestionsProvider, useQuestion }
