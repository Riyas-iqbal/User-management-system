import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import SignUp from './components/SignUp/SignUp';
import PrivateComponent from './components/Private/PrivateComponent';
import Login from './components/Login/Login';
import Profile from './components/Profile/Profile';
import Home from './components/Home/Home';
import ErrorPage from './components/ErrorPage/ErrorPage';
import UpdateProfile from './components/UpdateProfile/UpdateProfile'
import AdminLogin from './components/Admin/AdminLogin';
import AdminHome from './components/Admin/AdminHome';
import { AdminComponent } from './components/Private/AdminPrivate';
import ViewUsers from './components/Admin/ViewUsers';
import UpdateUser from './components/Admin/UpdateUser';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route element={<PrivateComponent />}>
            <Route path='/' element={<Home />} />
            <Route path='/profile/update' element={<UpdateProfile />} />
            <Route path='/logout' element={<h1>fosif</h1>} />
            <Route path='/profile' element={<Profile />} />
          </Route>
          <Route element={<AdminComponent/>}>
            <Route path='/admin/home' element={<AdminHome/>}></Route>
            <Route path='/admin/users' element={<ViewUsers/>}></Route>
            <Route path="/admin/update/:id" element={<UpdateUser/>} />
          </Route>
          <Route path='/signup' element={<SignUp />} />
          <Route path='/login' element={<Login />} />
          <Route path='/notfound' element={<ErrorPage />} />
          <Route path='/admin' element={<AdminLogin/>}></Route>
          <Route path='/*' element={<ErrorPage/>}/>
        </Routes>

        <Footer />
      </BrowserRouter>
    </div>
  )
}

export default App;
