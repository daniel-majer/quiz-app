import { /* useState, */ useEffect } from 'react'

function App() {
/*   const [test, setTest] = useState('')
 */
  useEffect(() => {
    try {
      fetch('./questions.json')
        .then(res => res.json())
        .then(data => console.log(data))
    } catch (error) {
      console.log(error)
    }
  }, [])

  return (
    <>
      <img src='logo1.png' alt='' />
    </>
  )
}

export default App
