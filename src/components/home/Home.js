import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchData, fetchFavorites } from '../../redux/reducers/userReducer';

import pageStyle from './home.module.css';

import NewsCard from '../newscard/NewsCard';
import Carousel from '../Carousel';
import Loader from '../Loader';

const Home = () => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.userReducer.loading);
  const data = useSelector((state) => state.userReducer.data);
  
  useEffect(() => {
    dispatch(fetchData('world'));
    dispatch(fetchFavorites());
  },[]);

  return (
    <>
    {loading? <Loader/> :
    <div className={pageStyle.homePage}>
      <Carousel data={data}/>
      <div className={pageStyle.container}>{
        data.map((news, index) => 
          (
            <div key={index}>
              {news.urlToImage? <NewsCard news={news} key={index} />:null}
            </div>
          )
        )
      }
      </div> 
    </div>
    }
    </>
  )
}

export default Home;
// Active link style, 