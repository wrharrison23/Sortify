import React, { useState, useEffect, createContext } from "react";
import SpotifyWebApi from "spotify-web-api-js";

export const SpotifyContext = createContext();

const spotifyApi = new SpotifyWebApi();

export const SongProvider = (props) => {
  const [tracks, setTracks] = useState({});
  const [features, setFeatures] = useState({});

  const buildTrackArray = (r) => {
    let trackArray = [];
    r.items.forEach((track) => {
      trackArray.push({
        name: track.name,
        id: track.id,
        artist: track.artists[0].name,
        imageUrl: track.album.images[1].url,
      });
    });
    return trackArray;
  };

  const getTopTracks = () => {
    spotifyApi.setAccessToken(localStorage.getItem("accessToken"));

    spotifyApi
      .getMyTopTracks({
        time_range: "medium_term",
        limit: 10,
      })
      .then((r) => {
        console.log(r);
        setTracks({
          trackArray: buildTrackArray(r),
        });
      });
  };

  const getFeatures = (trackArray) => {
    let idString = "";
    trackArray.forEach((track) => {
      idString += track.id + ",";
    });
    spotifyApi.getAudioFeaturesForTracks(idString).then((r) => setFeatures(r));
  };

  return (
    <SpotifyContext.Provider
      value={{
        getTopTracks,
        getFeatures,
        tracks,
        features,
      }}
    >
      {props.children}
    </SpotifyContext.Provider>
  );
};
