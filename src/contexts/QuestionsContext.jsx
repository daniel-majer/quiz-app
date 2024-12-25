import { createContext, useContext, useReducer } from 'react'

const QuestionContext = createContext()

const MAX_SEC = 300

function getRandomQuestions(array, count) {
  const shuffled = array.sort(() => 0.5 - Math.random())

  return shuffled.slice(0, count)
}

//'loading', 'error', 'ready', 'active', 'finished'
// working on case-study project for NFCtron these day
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

      let { category, questions } = findItem

      if (questions.length) questions = getRandomQuestions(questions, 15)

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

  const maxScore = questions.reduce((acc, curr) => curr.points + acc, 0)

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
        maxScore,
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
