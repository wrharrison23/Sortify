import { SpotifyContext } from "../Providers/SpotifyProvider";
import React, { useState, useContext, useEffect } from "react";
import { SongCard } from "./SongCard";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import SaveAltIcon from "@material-ui/icons/SaveAlt";
import Button from "@material-ui/core/Button";
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-evenly",
    flexGrow: 1,
    textAlign: "center",
    backGroundColor: "#203647",
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
  },
  button: {
    margin: theme.spacing(1),
    backGroundColor: "white",
    width: "100%",
  },
}));

export const SongList = () => {
  const {
    chillArray,
    sadArray,
    intenseArray,
    danceArray,
    feelGoodArray,
    savePlaylist,
    getTopTracks,
    getFeatures
  } = useContext(SpotifyContext);

  const classes = useStyles();

  useEffect(() => {
    getTopTracks().then(getFeatures)
  }, []);

  const handleSavePlaylist = (playlistName, description, songArray) => {
    let uriArray = songArray.map((song) => {
      return `spotify:track:${song.id}`;
    });
    console.log(uriArray)
    savePlaylist(playlistName, description, uriArray);

    console.log("Saved");
  };

  return (
    <>
      {/* <button onClick={buildMoodLists}>Get moods</button> */}
      <Grid container className={classes.container}>
        <div className={classes.root}>
          <Grid item xs={5}>
            <h3>Dance</h3>
            <div>
              {danceArray?.map((track) => {
                return <SongCard key={track.id} song={track} />;
              })}
            </div>
            <Grid item xs={8}>
              <Button
                variant="contained"
                color="default"
                size="large"
                className={classes.button}
                startIcon={<SaveAltIcon />}
                onClick={() =>
                  handleSavePlaylist(
                    "Sortify - Dance",
                    "Songs to dance to - created by Sortify",
                    danceArray
                  )
                }
              >
                Save
              </Button>
            </Grid>
          </Grid>
          <Grid item xs={5}>
            <h3>Chill</h3>
            <div>
              {chillArray?.map((track) => {
                return <SongCard key={track.id} song={track} />;
              })}
            </div>
            <Grid item xs={8}>
              <Button
                variant="contained"
                color="default"
                size="large"
                className={classes.button}
                startIcon={<SaveAltIcon />}
                onClick={() =>
                  handleSavePlaylist(
                    "Sortify - Chill",
                    "Songs to relax to - created by Sortify",
                    chillArray
                  )
                }
              >
                Save
              </Button>
            </Grid>
          </Grid>
        </div>
      </Grid>

      <Grid container>
        <div className={classes.root}>
          <Grid item xs={5}>
            <h3>Feel-good</h3>
            <div>
              {feelGoodArray?.map((track) => {
                return <SongCard key={track.id} song={track} />;
              })}
            </div>
            <Grid item xs={8}>
              <Button
                variant="contained"
                color="default"
                size="large"
                className={classes.button}
                startIcon={<SaveAltIcon />}
                onClick={() =>
                  handleSavePlaylist(
                    "Sortify - Feel-good",
                    "Feel-good songs - created by Sortify",
                    feelGoodArray
                  )
                }
              >
                Save
              </Button>
            </Grid>
          </Grid>
          <Grid item xs={5}>
            <h3>Intense</h3>
            <div>
              {intenseArray?.map((track) => {
                return <SongCard key={track.id} song={track} />;
              })}
            </div>
            <Grid item xs={8}>
              <Button
                variant="contained"
                color="default"
                size="large"
                className={classes.button}
                startIcon={<SaveAltIcon />}
                onClick={() =>
                  handleSavePlaylist(
                    "Sortify - Intense",
                    "Intense songs - created by Sortify",
                    intenseArray
                  )
                }
              >
                Save
              </Button>
            </Grid>
          </Grid>
        </div>
      </Grid>

      <Grid item xs={5}>
        <h3>Sad</h3>
        <div>
          {sadArray?.map((track) => {
            return <SongCard key={track.id} song={track} />;
          })}
        </div>
        <Grid item xs={8}>
          <Button
            variant="contained"
            color="default"
            size="large"
            className={classes.button}
            startIcon={<SaveAltIcon />}
            onClick={() =>
              handleSavePlaylist(
                "Sortify - Sad",
                "Wanna cry? I gotchu- created by Sortify",
                sadArray
              )
            }
          >
            Save
          </Button>
        </Grid>
      </Grid>
    </>
  );
};
