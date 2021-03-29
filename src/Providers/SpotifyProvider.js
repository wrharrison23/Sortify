import React, { useState, createContext } from "react";
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
  const [danceRecs, setDanceRecs] = useState([])
  const [chillRecs, setChillRecs] = useState([])
  const [intenseRecs, setIntenseRecs] = useState([])
  const [feelGoodRecs, setFeelGoodRecs] = useState([])
  const [sadRecs, setSadRecs] = useState([])


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

  const buildTrackArray = (r) => {
    let trackArray = [];
    r.items.forEach((track) => {
      trackArray.push({
        name: track.name,
        id: track.id,
        artist: track.artists[0].name,
        artistId: track.artists[0].id,
        imageUrl: track.album.images[1].url,
      });
    });
    return trackArray;
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

  // const buildGenreArray = (artists) => {
  //   let genreArray = []
  //   artists.forEach((artist) => {
  //     genreArray.push(artist.genres)
  //   })
  //   genreArray = genreArray.flat()
  //   return genreArray
  // }

  // let genres = [];
  // const getGenreSeeds = (songArray) => {
  //   let idString = ""
  //   let artists
  //   songArray.forEach((song) => {
  //     idString += song.artistId + ","
  //   }).then(() => {
  //      spotifyApi
  //        .getArtists(idString)
  //        .then((r) => {
  //          buildGenreArray(r)
  //        })
  //        .then(() => {
  //          artists.forEach((artist) => {
  //            genres.push(artist.genres);
  //          });
  //        })
  //   })
   
  // }

    const buildRecArray = (r) => {
      let trackArray = [];
      r.tracks.forEach((track) => {
        trackArray.push({
          name: track.name,
          id: track.id,
          artist: track.artists[0].name,
          artistId: track.artists[0].id,
          imageUrl: track.album.images[1].url,
        });
      });
      return trackArray;
    };

  const getRecommendations = (songArray, listName) => {
    let options = {}
    let artistIds = "";
    let songIds = "";

    for (let i = 0; i < 2; i++) {
      artistIds += songArray[i].artistId + ",";
      songIds += songArray[i].id + ",";
    }

   if(listName === "dance"){
      options = {
        "limit": 10,
        "seed_artists": artistIds,
        "seed_genres": "dance",
        "seed_tracks": songIds,
        "min_danceability": 0.6,
        "min_energy": 0.5,
      };
    } else if(listName === "chill"){
      options = {
      "limit": 10,
      "seed_artists": artistIds,
      "seed_genres": "chill",
      "seed_tracks": songIds,
      "max_energy": 0.8,
      "min_valence": 0.45,
    };
    } else if (listName === "intense"){
      options = {
      "limit": 10,
      "seed_artists": artistIds,
      "seed_genres": "work-out",
      "seed_tracks": songIds,
      "min_energy": 0.75,
    };
    } else if (listName === "feelGood"){
      options = {
      "limit": 10,
      "seed_artists": artistIds,
      "seed_genres": "happy",
      "seed_tracks": songIds,
      "min_energy": 0.3,
      "min_valence": 0.6,
    };
    } else if (listName === "sad") {
      options = {
      "limit": 10,
      "seed_artists": artistIds,
      "seed_genres": "sad",
      "seed_tracks": songIds,
      "max_energy": 0.6,
      "max_valence": 0.4,
    };
    }

    spotifyApi.getRecommendations(options).then((r) => {
      if (listName === "dance") {
        setDanceRecs(buildRecArray(r));
      } else if (listName === "chill") {
        setChillRecs(buildRecArray(r));
      } else if (listName === "sad") {
        setSadRecs(buildRecArray(r));
      } else if (listName === "intense") {
        setIntenseRecs(buildRecArray(r));
      } else if (listName === "feelGood") {
        setFeelGoodRecs(buildRecArray(r));
      }
    });
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
    CreatePlaylist(danceIds, feelGoodIds, sadIds, intenseIds, chillIds)
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
      artistId: relatedTrack.artistId,
      imageUrl: relatedTrack.imageUrl,
      id: relatedTrack.id,
      playlist: "dance",
    });
  });
  getRecommendations(danceList, "dance")
  setDanceArray(danceList);
  
  feelGoodIdArray.map((featureId) => {
    let relatedTrack = trackArray.find(
      (track) => track.id === featureId
    );
    feelGoodList.push({
      name: relatedTrack.name,
      artist: relatedTrack.artist,
      artistId: relatedTrack.artistId,
      imageUrl: relatedTrack.imageUrl,
      id: relatedTrack.id,
      playlist: "feelGood",
    });
  });
  getRecommendations(feelGoodList, "feelGood");
  setFeelGoodArray(feelGoodList);

  intenseIdArray.map((featureId) => {
    let relatedTrack = trackArray.find(
      (track) => track.id === featureId
    );
    intenseList.push({
      name: relatedTrack.name,
      artist: relatedTrack.artist,
      artistId: relatedTrack.artistId,
      imageUrl: relatedTrack.imageUrl,
      id: relatedTrack.id,
      playlist: "intense",
    });
  });
  getRecommendations(intenseList, "intense");
  setIntenseArray(intenseList);

  sadIdArray.map((featureId) => {
    let relatedTrack = trackArray.find(
      (track) => track.id === featureId
    );
    sadList.push({
      name: relatedTrack.name,
      artist: relatedTrack.artist,
      artistId: relatedTrack.artistId,
      imageUrl: relatedTrack.imageUrl,
      id: relatedTrack.id,
      playlist: "sad",
    });
  });
  getRecommendations(sadList, "sad");
  setSadArray(sadList);

  chillIdArray.map((featureId) => {
    let relatedTrack = trackArray.find(
      (track) => track.id === featureId
    );
    chillList.push({
      name: relatedTrack.name,
      artist: relatedTrack.artist,
      artistId: relatedTrack.artistId,
      imageUrl: relatedTrack.imageUrl,
      id: relatedTrack.id,
      playlist: "chill",
    });
  });
  getRecommendations(chillList, "chill");
  setChillArray(chillList)
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
        setFeelGoodArray, 
        getRecommendations,
        danceRecs,
        intenseRecs,
        sadRecs,
        feelGoodRecs,
        chillRecs,
        setDanceRecs,
        setChillRecs,
        setIntenseRecs,
        setFeelGoodRecs,
        setSadRecs
      }}
    >
      {props.children}
    </SpotifyContext.Provider>
  );
};
