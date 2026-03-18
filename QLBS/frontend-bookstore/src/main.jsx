import React from 'react'
import ReactDOM from 'react-dom/client' // Thêm dòng này để định nghĩa ReactDOM
import App from './App'
import { BrowserRouter } from 'react-router-dom'

// Sử dụng ReactDOM.createRoot để khởi tạo ứng dụng
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
)