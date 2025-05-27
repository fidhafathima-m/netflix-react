import React, { useEffect, useState, useContext } from 'react';
import './Player.css';
import backArrow from '../../assets/back_arrow_icon.png';
import { useNavigate, useParams } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthContext';
import { WatchlistContext } from '../../Context/WatchlistContext';
import { FaBookmark, FaRegBookmark } from 'react-icons/fa';

const Player = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { netflixUser } = useContext(AuthContext);
  const { watchlist, toggleWatchlist } = useContext(WatchlistContext);
  const [apiData, setApiData] = useState({
    name: '',
    key: '',
    published_at: '',
    type: ''
  });
  const [movieDetails, setMovieDetails] = useState({
    title: '',
    overview: '',
    release_date: ''
  });
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  const isInWatchlist = watchlist.includes(id);

  useEffect(() => {
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${import.meta.env.VITE_TMDB_ACCESS_TOKEN}`
      }
    };

    // Fetch video data
    fetch(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`, options)
      .then(res => res.json())
      .then(res => setApiData(res.results[0]))
      .catch(err => console.error(err));

    // Fetch movie details including overview
    fetch(`https://api.themoviedb.org/3/movie/${id}?language=en-US`, options)
      .then(res => res.json())
      .then(res => {
        setMovieDetails({
          title: res.title,
          overview: res.overview,
          release_date: res.release_date
        });
      })
      .catch(err => console.error(err));
  }, [id]);

  const handleWatchlistToggle = () => {
    if (!netflixUser) {
      alert('Please login to add to watchlist!');
      navigate('/login');
      return;
    }
    
    const wasAdded = toggleWatchlist(id);
    setAlertMessage(wasAdded ? 'Added to Watchlist!' : 'Removed from Watchlist!');
    setShowAlert(true);
    
    setTimeout(() => setShowAlert(false), 2000);
  };

  return (
    <div className='player'>
      {showAlert && (
        <div className="watchlist-alert">
          {alertMessage}
        </div>
      )}
      
      <div className="player-header">
        <img src={backArrow} alt="" onClick={() => navigate('/home')} />
      </div>
      <div className="player-content">
        <div className="video-container">
          <iframe 
            src={`https://www.youtube.com/embed/${apiData.key}`}
            title='Trailer' 
            frameBorder='0'
            allowFullScreen
          />
        </div>
        <div className="info-container">
          <h2>{movieDetails.title || apiData.name}</h2>
          <button 
            onClick={handleWatchlistToggle}
            className="watchlist-button"
            aria-label={isInWatchlist ? "Remove from watchlist" : "Add to watchlist"}
          >
            {isInWatchlist ? <FaBookmark /> : <FaRegBookmark />}
          </button>
          <p><strong>Release Date:</strong> {movieDetails.release_date}</p>
          <p><strong>Published:</strong> {apiData.published_at?.slice(0, 10)}</p>
          <p><strong>Type:</strong> {apiData.type}</p>
          <p className="video-description">
            {movieDetails.overview || "No description available."}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Player;