import React, { useState, useEffect, createContext } from "react";
import SpotifyWebApi from "spotify-web-api-js";

export const SpotifyContext = createContext();

const spotifyApi = new SpotifyWebApi();

export const SongProvider = (props) => {
  // const [tracks, setTracks] = useState({
  //   trackArray: [],
  // });
  // const [features, setFeatures] = useState({audio_features: []});
  const [danceArray, setDanceArray] = useState([]);
  const [feelGoodArray, setFeelGoodArray] = useState([]);
  const [intenseArray, setIntenseArray] = useState([]);
  const [chillArray, setChillArray] = useState([]);
  const [sadArray, setSadArray] = useState([]);

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

  let trackArray = []

  const getTopTracks = () => {
    spotifyApi.setAccessToken(localStorage.getItem("accessToken"));
    return (
    spotifyApi
      .getMyTopTracks({
        time_range: "medium_term",
        limit: 50,
      })
      .then((r) => {
        trackArray = buildTrackArray(r)
      })
    )
  };

  let features = []

  const getFeatures = () => {
    let idString = "";
    trackArray.forEach((track) => {
      idString += track.id + ",";
    });
    spotifyApi
      .getAudioFeaturesForTracks(idString)
      .then((r) => features = r)
      .then(buildMoodLists)
  };

  const buildMoodLists = () => {
    let danceIds = [];
    let feelGoodIds = [];
    let sadIds = [];
    let intenseIds = [];
    let chillIds = [];
    
    features.audio_features.filter((feature) => {
      if (feature.danceability > 0.6 && feature.energy > .5) {
        danceIds.push(feature.id);
      }
      if (feature.valence > 0.6 && feature.energy > 0.3) {
        feelGoodIds.push(feature.id);
      }
      if (feature.energy > 0.75) {
        intenseIds.push(feature.id);
      }
      if (feature.energy < .8 && feature.valence > .45) {
        chillIds.push(feature.id);
      }
      if (feature.valence < 0.4 && feature.energy < .6) {
        sadIds.push(feature.id);
      }
    });
    // setDanceIdArray(danceIds);
    // setFeelGoodIdArray(feelGoodIds);
    // setIntenseIdArray(intenseIds);
    // setChillIdArray(chillIds);
    // setSadIdArray(sadIds);
    CreatePlaylist(danceIds, feelGoodIds, sadIds, intenseIds, chillIds);
  };

const CreatePlaylist = (
  danceIdArray,
  feelGoodIdArray,
  sadIdArray,
  intenseIdArray,
  chillIdArray
) => {
  

  let danceList = [];
  let feelGoodList = [];
  let intenseList = [];
  let sadList = [];
  let chillList = [];
  
  danceIdArray.map((featureId) => {
    let relatedTrack = trackArray.find(
      (track) => track.id === featureId
    );
    danceList.push({
      name: relatedTrack.name,
      artist: relatedTrack.artist,
      imageUrl: relatedTrack.imageUrl,
      id: relatedTrack.id,
      playlist: "dance",
    });
  });
  setDanceArray(danceList);
  
  feelGoodIdArray.map((featureId) => {
    let relatedTrack = trackArray.find(
      (track) => track.id === featureId
    );
    feelGoodList.push({
      name: relatedTrack.name,
      artist: relatedTrack.artist,
      imageUrl: relatedTrack.imageUrl,
      id: relatedTrack.id,
      playlist: "feelGood",
    });
  });
  setFeelGoodArray(feelGoodList);

  intenseIdArray.map((featureId) => {
    let relatedTrack = trackArray.find(
      (track) => track.id === featureId
    );
    intenseList.push({
      name: relatedTrack.name,
      artist: relatedTrack.artist,
      imageUrl: relatedTrack.imageUrl,
      id: relatedTrack.id,
      playlist: "intense",
    });
  });
  setIntenseArray(intenseList);

  sadIdArray.map((featureId) => {
    let relatedTrack = trackArray.find(
      (track) => track.id === featureId
    );
    sadList.push({
      name: relatedTrack.name,
      artist: relatedTrack.artist,
      imageUrl: relatedTrack.imageUrl,
      id: relatedTrack.id,
      playlist: "sad",
    });
  });
  setSadArray(sadList);

  chillIdArray.map((featureId) => {
    let relatedTrack = trackArray.find(
      (track) => track.id === featureId
    );
    chillList.push({
      name: relatedTrack.name,
      artist: relatedTrack.artist,
      imageUrl: relatedTrack.imageUrl,
      id: relatedTrack.id,
      playlist: "chill",
    });
  });
  setChillArray(chillList);
};

  const savePlaylist = (playlistName, description, uris) => {
    let playlistId;
    let userId;

    spotifyApi
      .getMe()
      .then((r) => (userId = r.id))
      .then(() => {
        spotifyApi
          .createPlaylist(userId, {
            name: playlistName,
            description: description,
          })
          .then((r) => {
            playlistId = r.id;
          })
          .then(() => {
            spotifyApi.addTracksToPlaylist(playlistId, 
              uris
            );
          });
      });
  };
  return (
    <SpotifyContext.Provider
      value={{
        chillArray,
        sadArray,
        intenseArray,
        danceArray,
        feelGoodArray,
        savePlaylist,
        getTopTracks,
        getFeatures,
        setChillArray,
        setSadArray,
        setIntenseArray,
        setDanceArray,
        setFeelGoodArray
      }}
    >
      {props.children}
    </SpotifyContext.Provider>
  );
};
