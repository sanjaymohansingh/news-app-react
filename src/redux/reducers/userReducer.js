import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import db, { auth } from "../../firebase";
import { doc, setDoc, onSnapshot, updateDoc } from "firebase/firestore";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged,
  signInWithPopup,
} from "firebase/auth";
import axios from "axios";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const INITIAL_STATE = {
  user: null,
  data: [],
  loading: false,
  favorites: [],
};

// Fetch data from API
export const fetchData = createAsyncThunk(
  "user/fetchData",
  async (query, thunkAPI) => {
    thunkAPI.dispatch(setLoading(true));
    const response = await axios
      .get(
        `https://newsapi.org/v2/everything?q=${query}&apiKey=${process.env.REACT_APP_NEWS_APP_API_KEY}`
      )
      .then((res) => res.data)
      .then((data) => {
        thunkAPI.dispatch(setData(data.articles));
      });
    thunkAPI.dispatch(setLoading(false));
  }
);

// Sign up
export const createUserAsync = createAsyncThunk(
  "user/createUser",
  async (values, thunkAPI) => {
    thunkAPI.dispatch(setLoading(true));
    createUserWithEmailAndPassword(auth, values.email, values.pass)
      .then(async (res) => {
        console.log("signed up successfully.");
        await updateProfile(res.user, {
          displayName: values.name,
        });
        const currentUser = {
          name: res.user.displayName,
          email: res.user.email,
          password: values.pass,
          favorites: [],
        };
        const userDocRef = doc(db, "users", currentUser.email);
        setDoc(userDocRef, currentUser);
        thunkAPI.dispatch(setUser(currentUser));
        thunkAPI.dispatch(setLoading(false));
      })
      .catch((err) => {
        thunkAPI.dispatch(setLoading(false));
        toast.error(err.message);
      });
  }
);

// Sign In
export const logInAsync = createAsyncThunk(
  "user/login",
  async (values, thunkAPI) => {
    thunkAPI.dispatch(setLoading(true));
    await signInWithEmailAndPassword(auth, values.email, values.pass)
      .then(async (res) => {
        console.log("signed in successfully");
        const currentUser = {
          name: res.user.displayName,
          email: res.user.email,
          password: values.pass,
          favorites: [],
        };
        const userDocRef = doc(db, "users", currentUser.email);
        setDoc(userDocRef, currentUser);
        thunkAPI.dispatch(setUser(currentUser));
        thunkAPI.dispatch(setLoading(false));
      })
      .catch((err) => {
        toast.error(err.message);
        thunkAPI.dispatch(setLoading(false));
      });
  }
);

// Sign in with google
export const signInWithGoogle = createAsyncThunk(
  "user/signInWithGoogle",
  async (arg, thunkAPI) => {
    thunkAPI.dispatch(setLoading(true));
    const provider = new GoogleAuthProvider();

    await signInWithPopup(auth, provider)
      .then((res) => {
        const currentUser = {
          name: res.user.displayName,
          email: res.user.email,
          favorites: [],
        };
        const userDocRef = doc(db, "users", currentUser.email);
        setDoc(userDocRef, currentUser);
        thunkAPI.dispatch(setUser(currentUser));
        thunkAPI.dispatch(setLoading(false));
      })
      .catch((err) => {
        toast.error(err.message);
        thunkAPI.dispatch(setLoading(false));
      });
  }
);

// Sign out
export const logOutAsync = createAsyncThunk(
  "user/logOut",
  async (arg, thunkAPI) => {
    signOut(auth)
      .then(() => {
        console.log("signed out successfully ! ");
        thunkAPI.dispatch(setUser(null));
      })
      .catch((err) => {
        toast.error(err.message);
      });
  }
);

// Authentication
export const authentication = createAsyncThunk(
  "user/authentication",
  async (arg, thunkAPI) => {
    onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        const user = {
          userId: currentUser.uid,
          name: currentUser.displayName,
          email: currentUser.email,
          favorites: [],
        };
        thunkAPI.dispatch(setUser(user));
      }
    });
  }
);

// Fetch favorite articles list
export const fetchFavorites = createAsyncThunk(
  "user/fetchFavorites",
  async (arg, thunkAPI) => {
    const { userReducer } = thunkAPI.getState();
    const { user } = userReducer;
    if (user) {
      const unsub = onSnapshot(doc(db, "users", user.email), (doc) => {
        if (doc.data()) {
          thunkAPI.dispatch(setFavorites(doc.data().favorites));
        }
      });
    }
  }
);

export const addToFavorites = createAsyncThunk(
  "user/add",
  async (obj, thunkAPI) => {
    const { userReducer } = thunkAPI.getState();
    const { user, favorites } = userReducer;
    const item = {
      title: obj.title,
      publishedAt: obj.publishedAt,
      url: obj.url,
      urlToImage: obj.urlToImage,
      content: obj.content,
    };

    const docRef = doc(db, "users", user.email);
    await updateDoc(docRef, {
      favorites: [...favorites, item],
    });
    toast.success("Article added to your favorites list.");
    thunkAPI.dispatch(fetchFavorites());
  }
);

export const removeFromFavorites = createAsyncThunk(
  "user/removeFavorite",
  async (obj, thunkAPI) => {
    const { userReducer } = thunkAPI.getState();
    const { user, favorites } = userReducer;
    const updatedArray = favorites.filter((item) => item.title !== obj.title);

    const docRef = doc(db, "users", user.email);
    await updateDoc(docRef, {
      favorites: [...updatedArray],
    });
    toast.success("Article removed from your favorites list.");
    thunkAPI.dispatch(fetchFavorites());
  }
);

// See news according to category choosen
export const onCategoryClick = createAsyncThunk(
  "user/specificdata",
  async (category, thunkAPI) => {
    thunkAPI.dispatch(fetchData(category));
  }
);

const userSlice = createSlice({
  name: "userInfo",
  initialState: INITIAL_STATE,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setData: (state, action) => {
      state.data = [...action.payload];
    },
    setFavorites: (state, action) => {
      state.favorites = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const userReducer = userSlice.reducer;
export const { setUser, setData, setFavorites, setLoading } = userSlice.actions;
export const userSelector = (state) => state.userReducer.user;
