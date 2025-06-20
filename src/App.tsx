import { useState } from 'react'
import { Button, Form, Input } from 'antd'
import './App.css'
import UserForm from './module/users/userForm'
import  { Link, Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import OrderData from './module/order/OrderData'
import ProductoData from './module/product/ProductData'

function App() {
  //1.- obtener valor de la variable
  //2.- Modificar el valor
  const [count, setCount] = useState(5)

  return (
    <>
      <Router>
        <nav>
          <ul>
            <li><Link to="/users">Usuarios</Link></li>
            <li><Link to="/products">Productos</Link></li>
            <li><Link to="/orders">Ordenes</Link></li>
          </ul>
        </nav>

        <Routes>
          <Route path="/users" element={<UserForm />} />
          <Route path="/products" element={<ProductoData />} />
          <Route path="/orders" element={<OrderData />} />
        </Routes>
      </Router>
      </>
  )
}


export default App
