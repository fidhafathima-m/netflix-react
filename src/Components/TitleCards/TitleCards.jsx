import React, { useEffect, useRef, useState } from 'react'
import './TitleCards.css'
import { Link } from 'react-router-dom';


const TitleCards = ({ title, category, movies }) => {
  const [apiData, setApiData] = useState([]);
  const cardsRef = useRef();

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${import.meta.env.VITE_TMDB_ACCESS_TOKEN}`
    }
  };

  useEffect(() => {
    if (category && !movies) {
      fetch(`https://api.themoviedb.org/3/movie/${category}?language=en-US&page=1`, options)
        .then(res => res.json())
        .then(res => setApiData(res.results))
        .catch(err => console.error(err));
    }

    cardsRef.current?.addEventListener('wheel', handleWheel);

    return () => {
      cardsRef.current?.removeEventListener('wheel', handleWheel);
    };
  }, [category, movies]);

  const handleWheel = (event) => {
    event.preventDefault();
    cardsRef.current.scrollLeft += event.deltaY;
  };

  const listToRender = movies || apiData;

  return (
    <div className='titleCards'>
      <h2>{title || "Popular on Netflix"}</h2>
      <div className='card-list' ref={cardsRef}>
        {listToRender.map((card, index) => (
          <Link to={`/player/${card.id}`} className="card" key={index}>
            <img src={`https://image.tmdb.org/t/p/w500${card.backdrop_path}`} alt={card.title} />
            <p>{card.original_title || card.title}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};


export default TitleCards