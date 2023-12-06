import React from 'react';
import pageStyle from './newscard.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { addToFavorites, removeFromFavorites } from '../../redux/reducers/userReducer';

const NewsCard = ({news}) => {
  const dispatch = useDispatch();
  const favoritesList = useSelector((state) => state.userReducer.favorites);

  function isFavorite(obj){
    return favoritesList.some((element) => element.title === obj.title);
  }

  function handleClick(){
    window.open(news.url, '_blank')
  }

  return (
      <div className={pageStyle.newsBox}>
        <div> <img src={news.urlToImage}/></div>
        
          {isFavorite(news)
            ?<button onClick={() => dispatch(removeFromFavorites(news))} className={pageStyle.favBtn}><i className="fa-solid fa-heart-circle-minus"></i></button>
            :<button onClick={() => dispatch(addToFavorites(news))} className={pageStyle.favBtn}><i className="fa-solid fa-heart-circle-plus"></i></button>
          } 

        <div onClick={handleClick} className={pageStyle.newsContent}>
          <h2> {news.title} </h2>
          <h4> {news.publishedAt} </h4>
          <p> {news.content} </p>
        </div>
      </div>
  )
}

export default NewsCard;
