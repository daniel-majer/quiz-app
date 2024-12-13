import { createRoot } from 'react-dom/client'
import './index.css'
import './normalize.css'
import App from './App.jsx'
import { QuestionsProvider } from './contexts/QuestionsContext.jsx'

createRoot(document.getElementById('root')).render(
  <QuestionsProvider>
    <App />
  </QuestionsProvider>
)
