import React, { useState, useEffect, createContext } from "react";
import SpotifyWebApi from "spotify-web-api-js";

export const SpotifyContext = createContext();

const spotifyApi = new SpotifyWebApi();

export const SongProvider = (props) => {
  const [tracks, setTracks] = useState({
    trackArray: []
  });
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
    return (
    spotifyApi
      .getMyTopTracks({
        time_range: "medium_term",
        limit: 20,
      })
      .then((r) => {
        console.log(r);
        setTracks({
          trackArray: buildTrackArray(r),
        });
      })
    )
  };

  const getFeatures = (trackArray) => {
    console.log(trackArray)
    let idString = "";
    trackArray.forEach((track) => {
      idString += track.id + ",";
    });
    return (
    spotifyApi.getAudioFeaturesForTracks(idString)
    .then((r) => console.log(r))
    )
  };

  const savePlaylist = (playlistName, description, songUris) => {
    let playlistId
    let userId

    spotifyApi.getMe().then((r) => 
    userId = r.id)
    .then(() => {
    spotifyApi.createPlaylist(userId, {
      "name": playlistName,
      "description": description
    }).then((r) => {
      playlistId = r.id
    }).then(() => {
      spotifyApi.addTracksToPlaylist(playlistId, {
       songUris
      });
    })
    })
  }
  return (
    <SpotifyContext.Provider
      value={{
        getTopTracks,
        getFeatures,
        tracks,
        features,
        savePlaylist
      }}
    >
      {props.children}
    </SpotifyContext.Provider>
  );
};
