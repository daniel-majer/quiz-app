import { useContext, useEffect, useReducer } from 'react'

import { Header } from './components/Header'
import { Main } from './components/Main'
import { StartScreen } from './components/StartScreen'
import { Error } from './components/Error'
import { Loading } from './components/Loading'
import { Questions } from './components/Questions'
import { Finish } from './components/Finish'
import { useQuestion } from './contexts/QuestionsContext'

function App() {
  const { status, dispatch } = useQuestion()

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
        {status === 'ready' && <StartScreen />}
        {status === 'active' && <Questions />}
        {status === 'finished' && <Finish />}
      </Main>
    </>
  )
}

export default App
