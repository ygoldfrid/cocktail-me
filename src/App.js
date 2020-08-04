import React, { useState, useEffect } from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import AuthContext from "./contexts/authContext";
import BarContext from "./contexts/barContext";
import TourContext from "./contexts/tourContext";

import auth from "./services/authService";
import barService from "./services/barService";
import cocktailService from "./services/cocktailService";

import ForgotPassword from "./components/auth/ForgotPassword";
import ValidateToken from "./components/auth/ValidateToken";
import ResetPassword from "./components/auth/ResetPassword";
import SuccessReset from "./components/auth/SuccessReset";
import RegisterPage from "./components/auth/RegisterPage";
import IngredientPage from "./components/IngredientPage";
import CocktailPage from "./components/CocktailPage";
import LoginPage from "./components/auth/LoginPage";
import AppTour from "./components/appTour/AppTour";
import Profile from "./components/Profile";
import Market from "./components/Market";
import NavBar from "./components/Navbar";
import MyBar from "./components/MyBar";
import Home from "./components/Home";

import "react-toastify/dist/ReactToastify.css";
import "./App.css";

export default function App() {
  const [bar, setBar] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [isTourOpen, setIsTourOpen] = useState(false);
  const [useMyBar, setUseMyBar] = useState(false);
  const [user, setUser] = useState();

  useEffect(() => {
    getMainData();
  }, []);

  const getMainData = async () => {
    const user = auth.getCurrentUser();
    setUser(user);

    setIsTourOpen(auth.openTour());

    const bar = await cocktailService.getBar(user);
    setBar(bar);

    if (user) {
      const { data: favorites } = await cocktailService.getFavorites();
      setFavorites(favorites);
    }
  };

  const addOrRemoveItem = async (ingredient, isInMyBar = true) => {
    const barCopy = [...bar];
    if (isInMyBar) await barService.removeFromBar(user, ingredient, barCopy);
    else await barService.addToBar(user, ingredient, barCopy);

    setBar(barCopy);
  };

  const addOrRemoveFavorites = async (cocktailId, isFavorite = true) => {
    let { data: favorites } = isFavorite
      ? await cocktailService.removeFromFavorites(cocktailId)
      : await cocktailService.addToFavorites(cocktailId);

    setFavorites(favorites);
  };

  return (
    <AuthContext.Provider
      value={{ addOrRemoveFavorites, user, setUser, favorites }}
    >
      <BarContext.Provider
        value={{ addOrRemoveItem, bar, setUseMyBar, useMyBar }}
      >
        <TourContext.Provider value={{ isTourOpen, setIsTourOpen }}>
          <AppTour />
          <ToastContainer />
          <NavBar />
          <div className="container-fluid">
            <main role="main">
              <Switch>
                <Route
                  path="/forgotPassword/validate"
                  component={ValidateToken}
                />
                <Route
                  path="/forgotPassword/successReset"
                  component={SuccessReset}
                />
                <Route path="/forgotPassword/reset" component={ResetPassword} />
                <Route path="/forgotPassword" component={ForgotPassword} />
                <Route path="/login" component={LoginPage} />
                <Route path="/register" component={RegisterPage} />
                <Route path="/profile" component={Profile} />
                <Route path="/cocktails/:id" component={CocktailPage} />
                <Route path="/ingredients/:id" component={IngredientPage} />
                <Route path="/market" component={Market} />
                <Route path="/mybar" component={MyBar} />
                <Route path="/home" component={Home} />
                <Redirect from="/" exact to="/home" />
                <Redirect to="/home" />
              </Switch>
            </main>
          </div>
        </TourContext.Provider>
      </BarContext.Provider>
    </AuthContext.Provider>
  );
}
