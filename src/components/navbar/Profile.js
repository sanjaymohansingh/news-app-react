import React from 'react';
import { Link } from 'react-router-dom';
 import { useDispatch, useSelector } from 'react-redux';

import pageStyle from  './navbar.module.css';
import { userSelector, logOutAsync } from '../../redux/reducers/userReducer';


const Profile = ({onMouseEnter, onMouseLeave}) => {
    const user = useSelector(userSelector);
    const dispatch = useDispatch();

  return (
        <div className={pageStyle.profileCard} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}> 
        {user ?<>
            <h1> Hello {user.name} </h1>
            <span> Welcome to our website </span>
            <button onClick={() => dispatch(logOutAsync())}> Sign out <i className="fa-solid fa-arrow-right-from-bracket"></i> </button>
            <div className={pageStyle.favoritesBtn}> <Link to='/favorites'> <i className="fa-solid fa-heart"></i> <span>My Favorites</span> </Link> </div> 
            </>
            :<>
            <h1> Hello user </h1>
            <span> To access your account </span>
            <button><Link to="/signin">  Sign In <i className="fa-solid fa-arrow-right-into-bracket"></i> </Link> </button>
            </>
        }
        </div>
  )
}

export default Profile;
