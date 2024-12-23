import React from 'react'
import { Routes, Route, BrowserRouter } from "react-router-dom";

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import PrivateRoute from './routes/PrivateRoute';
import CustomerPrivateRoute from './routes/CustomerPrivateRoute';
import AdminPrivateRoute from './routes/AdminPrivateRoute'

import Home from './pages/Home'
import PageNotFound from './pages/PageNotFound';

import Customer from './pages/Dashboards/Customer';
import Book from './pages/Routes/Customer/Book';
import Cancel from './pages/Routes/Customer/Cancel';
import View from './pages/Routes/Customer/View';

import Admin from './pages/Dashboards/Admin';
import NewRoute from './pages/Routes/Admin/NewRoute';
import ViewRoutes from './pages/Routes/Admin/ViewRoutes';

function App() {
  return (
    <BrowserRouter>
      <ToastContainer />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route element={<PrivateRoute />}>
          <Route element={<CustomerPrivateRoute />}>
            <Route exact path='/customer' element={<Customer/>}/>
            <Route exact path='/customer/book' element={<Book/>}/>
            <Route exact path='/customer/cancel' element={<Cancel/>}/>
            <Route exact path='/customer/view' element={<View/>}/>
          </Route>
          <Route element={<AdminPrivateRoute />}>
            <Route exact path='/admin' element={<Admin/>}/>
            <Route exact path='/admin/newRoute' element={<NewRoute/>}/>
            <Route exact path='/admin/viewRoutes' element={<ViewRoutes/>}/>
          </Route>
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App