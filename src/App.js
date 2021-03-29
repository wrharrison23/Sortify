import React from "react";

import { SongList } from "./Spotify/SongList";
import Cookies from "js-cookie";
import { SpotifyAuth } from "react-spotify-auth";
import "react-spotify-auth/dist/index.css";
import { SongProvider } from "./Providers/SpotifyProvider";
import SpotifyWebApi from "spotify-web-api-js";
import "./App.css";
import logo from "./assets/Sortify.png"


const spotifyApi = new SpotifyWebApi();

export const App = () => {
  const token = Cookies.get("spotifyAuthToken");

  if (token) {
    localStorage.setItem("accessToken", token);
    spotifyApi.setAccessToken(token);
  }

  return (
    <div className="app">
      {token ? (
        <SongProvider>
          <div className="logoDiv">
            <img src={logo} alt="#" className="logo" />
          </div>
          <div className="songListContainer">
            <SongList />
          </div>
          
        </SongProvider>
      ) : (
        // Display the login page
        <div className="authPage">
          <h2 className="authHeader">Sortify</h2>
          <SpotifyAuth
            redirectUri="http://localhost:3000/callback"
            clientID="8e60798c10de43eb9c5facdabbabff2b"
            logoClassName="loginLogo"
            btnClassName="loginBtn"
            scopes={[
              "user-read-private",
              "user-read-email",
              "user-read-playback-state",
              "user-top-read",
              "playlist-modify-private",
              "playlist-modify-public",
              "playlist-modify-public",
              "playlist-modify-private",
              "streaming",
              "user-modify-playback-state",
            ]}
          />
        </div>
      )}
    </div>
  );
};
