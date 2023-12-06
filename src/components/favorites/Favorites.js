import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import pageStyle from './favorites.module.css';

import { removeFromFavorites } from '../../redux/reducers/userReducer';
import { Link } from 'react-router-dom';

const Favorites = () => {
  const dispatch = useDispatch();
  const favoritesList = useSelector((state) => state.userReducer.favorites);
    
    return (
      <div className={pageStyle.favPage}>
        <h1 className={pageStyle.headline}> Your Favorite Articles </h1>
        {favoritesList.length === 0
          ?<div className={pageStyle.noArticles}> 
            There are no articles in your favorites list. 
            <Link to='/'> Go to home page </Link>
          </div>
          :<div className={pageStyle.favoritesBox}>
            {favoritesList.map((news, index) => (
              <div className={pageStyle.newsBox} key={index}>
                <div> <img src={news.urlToImage}/></div>
                <button onClick={() => dispatch(removeFromFavorites(news))} className={pageStyle.favBtn}> 
                  <i className="fa-solid fa-heart-circle-minus"></i> 
                </button>
                <h2> {news.title} </h2>
                <h4> {news.publishedAt} </h4>
                <p> {news.content} </p>
              </div>  
              ))}
          </div>
        }
      </div>
    )
}

export default Favorites;
