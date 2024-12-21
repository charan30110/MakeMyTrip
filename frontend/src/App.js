import React from 'react'
import { Routes, Route, BrowserRouter } from "react-router-dom";

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import PrivateRoute from './routes/PrivateRoute';
import CustomerPrivateRoute from './routes/CustomerPrivateRoute';

import Home from './pages/Home'
import PageNotFound from './pages/PageNotFound';

import Customer from './pages/Dashboards/Customer'

function App() {
  return (
    <BrowserRouter>
      <ToastContainer />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route element={<PrivateRoute />}>
          <Route element={<CustomerPrivateRoute />}>
            <Route exact path='/customer' element={<Customer/>}/>
          </Route>
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App