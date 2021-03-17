import { SpotifyContext } from "../Providers/SpotifyProvider";
import React, { useState, useContext, useEffect } from "react";
import { SongCard } from "./SongCard";
import { makeStyles } from "@material-ui/core/styles";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import ListSubheader from "@material-ui/core/ListSubheader";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    flexGrow: 1,
  },
  paper: {
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
  icon: {
    color: "rgba(255, 255, 255, 0.54)",
  },
  container: {
    marginBottom: "2px"
  }
}));



export const SongList = () => {
  const { tracks, features, getFeatures, getTopTracks } = useContext(
    SpotifyContext
  );
 const classes = useStyles()

  useEffect(() => {
    getTopTracks();
  }, []);

  return (
    <>
      <Grid container className={classes.container}>
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

// const sortSong = (song) => {
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
