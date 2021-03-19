import { SpotifyContext } from "../Providers/SpotifyProvider";
import React, { useState, useContext, useEffect } from "react";
import { SongCard } from "./SongCard";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-evenly",
    flexGrow: 1,
    textAlign: "center",
    backGroundColor: "#203647"
  },
  paper: {
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
  icon: {
    color: "rgba(255, 255, 255, 0.54)",
  },
  container: {
    marginBottom: "2px",
  }
}));

export const SongList = () => {
  const { tracks, features, getFeatures, getTopTracks } = useContext(
    SpotifyContext
  );
  const [danceTracks, setDanceTracks] = useState([])
  const [danceArray, setDanceArray] = useState([]);
  const classes = useStyles()

  useEffect(() => {
    getTopTracks()
  }, []);

  const buildMoodLists = () => {
      let featureArray = [];
      features.audio_features.filter((feature) => {
        if (feature.danceability > 0.4) {
          featureArray.push(feature.id);
        }
      });
      setDanceTracks(featureArray)
    }

  // const createMoods = () => {
  //  getFeatures(tracks.trackArray)
  //   buildMoodLists()
  //   createPlaylist()
  // }

  // const createPlaylist = () => {
  //   let danceArray = []
  //   danceTracks.map((featureId) => {
  //     let relatedTrack = tracks.trackArray.find((track) => 
  //       track.id === featureId
  //     )
  //     danceArray.push({
  //       name: relatedTrack.name,
  //       artist: relatedTrack.artist,
  //       imageUrl:relatedTrack.imageUrl,
  //       id: relatedTrack.id,
  //       playlist: "dance"
  //     }
  //     )
  // }
  //   )
  // setDanceArray(danceArray)
  // }


  // const sortSongs = () => {
    
  //   let dance = [];
  //   let energy = [];
  //   song.filter(() => {
  //     if (song.danceability > 0.5) {
  //       dance.push(song.id);
  //     } else if (song.energy > 0.5) {
  //       energy.push(song.id);
  //     }
  //   });
  // };

  return (
    <>
      {/* <button onClick={createMoods}>Get moods</button> */}
      <Grid container className={classes.container}>
        <div className={classes.root}>
          <Grid item xs={5}>
            <h3>Dance</h3>
            <div>
              {danceArray?.map((track) => {
                return <SongCard key={track.id} song={track} />;
              })}
            </div>
          </Grid>
          <Grid item xs={5}>
            <h3>Feel-good</h3>
            <div>
              {tracks.trackArray?.map((track) => {
                return <SongCard key={track.id} song={track} />;
              })}
            </div>
          </Grid>
        </div>
      </Grid>

      <Grid container>
        <div className={classes.root}>
          <Grid item xs={5}>
            <h3>Feel-good</h3>
            <div>
              {tracks.trackArray?.map((track) => {
                return <SongCard key={track.id} song={track} />;
              })}
            </div>
          </Grid>
          <Grid item xs={5}>
            <h3>Feel-good</h3>
            <div>
              {tracks.trackArray?.map((track) => {
                return <SongCard key={track.id} song={track} />;
              })}
            </div>
          </Grid>
        </div>
      </Grid>
    </>
  );
};
 

