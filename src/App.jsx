import React from 'react'
import Home from './components/Home/Home'
import { Routes, Route } from 'react-router-dom'
import Login from './components/Login/Login'
import Player from './/components/Player/Player'
import WatchlistPage from './components/Watchlist/Watchlist'

const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Login/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/home' element={<Home/>}/>
        <Route path='/player/:id' element={<Player/>}/>
        <Route path='/watchlist' element={<WatchlistPage/>}/>
      </Routes>
      
    </div>
  )
}

export default App