import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../Context/AuthContext.js';
import { WatchlistContext } from '../../Context/WatchlistContext';
import TitleCards from '../../components/TitleCards/TitleCards.jsx';
import { useNavigate } from 'react-router-dom';
import backArrow from '../../assets/back_arrow_icon.png';
import './Watchlist.css';

const WatchlistPage = () => {
  const { netflixUser } = useContext(AuthContext);
  const { watchlist } = useContext(WatchlistContext);
  const [movies, setMovies] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    console.log('Current user:', netflixUser);
  console.log('Current watchlist from context:', watchlist);
    if (!netflixUser) {
      navigate('/login');
      return;
    }

    const fetchWatchlistMovies = async () => {
      try {
        const options = {
          method: 'GET',
          headers: {
            accept: 'application/json',
            Authorization: `Bearer ${import.meta.env.VITE_TMDB_ACCESS_TOKEN}`
          }
        };

        const moviePromises = watchlist.map(movieId =>
          fetch(`https://api.themoviedb.org/3/movie/${movieId}`, options)
            .then(res => res.json())
        );

        const fetchedMovies = await Promise.all(moviePromises);
        setMovies(fetchedMovies.filter(movie => movie.title));
      } catch (error) {
        console.error('Error fetching watchlist:', error);
      }
    };

    fetchWatchlistMovies();
  }, [watchlist, netflixUser, navigate]);

  return (
    <div className="watchlist-container">
      <div className="player-header">
        <img src={backArrow} alt="" onClick={() => navigate('/home')} />
        
      </div>
      {movies.length === 0 ? (
        <p className="empty-watchlist">Your watchlist is empty. Add some movies!</p>
      ) : (
          <TitleCards title="My Watchlist" movies={movies} />
      )}
    </div>
  );
};

export default WatchlistPage;