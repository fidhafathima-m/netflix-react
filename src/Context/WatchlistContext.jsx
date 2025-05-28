import React, { createContext, useContext, useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';

export const WatchlistContext = createContext();

export const WatchlistProvider = ({ children }) => {
  const { netflixUser } = useContext(AuthContext);
  const [watchlist, setWatchlist] = useState([]);

  useEffect(() => {
  if (netflixUser) {
    const allWatchlists = JSON.parse(localStorage.getItem('watchlists')) || {};
    setWatchlist(allWatchlists[netflixUser.email] || []);
  } else {
    setWatchlist([]);
  }
}, [netflixUser]);


  const toggleWatchlist = (movieId) => {
  if (!netflixUser) {
    return false;
  }

  const allWatchlists = JSON.parse(localStorage.getItem('watchlists')) || {};
  const currentWatchlist = allWatchlists[netflixUser.email] || [];

  const updatedWatchlist = currentWatchlist.includes(movieId)
    ? currentWatchlist.filter(id => id !== movieId)
    : [...currentWatchlist, movieId];

  const updatedWatchlists = {
    ...allWatchlists,
    [netflixUser.email]: updatedWatchlist,
  };

  localStorage.setItem('watchlists', JSON.stringify(updatedWatchlists));
  setWatchlist(updatedWatchlist);

  return !currentWatchlist.includes(movieId);
};


  return (
    <WatchlistContext.Provider value={{ watchlist, toggleWatchlist }}>
      {children}
    </WatchlistContext.Provider>
  );
};