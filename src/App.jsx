import { Route, Routes } from 'react-router-dom'
import Footer from './components/Footer'
import Header from './components/Header'
import About from './pages/About'
import Brownies from './pages/Brownies'
import Contact from './pages/Contact'
import Desserts from './pages/Desserts'
import Home from './pages/Home'
import IceCreams from './pages/IceCreams'
import Menu from './pages/Menu'
import ProductDetail from './pages/ProductDetail'
import './App.css'

function App() {
  return (
    <div className="min-h-screen bg-[#fbf9f1] text-[#1b1c17]">
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          
          <Route path="/menu" element={<Menu />} />
          <Route path="/menu/:itemId" element={<ProductDetail type="cake" />} />
          <Route path="/brownies" element={<Brownies />} />
          <Route path="/brownies/:itemId" element={<ProductDetail type="brownie" />} />
          <Route path="/desserts" element={<Desserts />} />
          
          <Route path="/desserts/:itemId" element={<ProductDetail type="dessert" />} />

          <Route path="/ice-creams" element={<IceCreams />} />
          <Route path="/ice-creams/:itemId" element={<ProductDetail type="ice" />} />

          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default App
