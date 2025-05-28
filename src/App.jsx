import React from 'react'
import Home from './pages/Home/Home'
import { Routes, Route } from 'react-router-dom'
import Login from './pages/Login/Login'
import Player from './pages/Player/Player'
import WatchlistPage from './pages/Watchlist/Watchlist'

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