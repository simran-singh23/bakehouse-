import { Route, Routes } from 'react-router-dom'
import Footer from './components/Footer'
import Header from './components/Header'
import About from './pages/About'
import Contact from './pages/Contact'
import Home from './pages/Home'
import Menu from './pages/Menu'
import './App.css'

function App() {
  return (
    <div className="min-h-screen bg-[#fff8f4] text-stone-900">
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          
          <Route path="/menu" element={<Menu />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default App
