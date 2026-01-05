import { Routes, Route } from 'react-router-dom'
import './App.css'
import Chat from './pages/Chat.tsx'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Chat/>}/>
    </Routes>
  )
}

export default App
