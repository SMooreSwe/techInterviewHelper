import React from 'react';
import './App.css';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { Home } from './components/Home';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Login } from './components/Login';
import { User } from './components/User';
import { CreateUser } from './components/CreateUser';
import background  from './images/marvin-meyer-SYTO3xs06fU-unsplash.jpg'

function App() {
  return (
    <div className="App">
      <img src={background} className="App__bg" alt="" />
      <Header/>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/login" element={<Login/>}></Route>
        <Route path="/login/:username" element={<User/>}></Route>
        <Route path="/createUser" element={<CreateUser/>}></Route>
      </Routes>
      </BrowserRouter>
      <div className='App__attrib-container'>
      <p className='attrib-container__text'>background photo by <a href="https://unsplash.com/@marvelous?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Marvin Meyer</a> at Unsplash</p>
      </div>
      <Footer/>
    </div>
  );
}

export default App;
