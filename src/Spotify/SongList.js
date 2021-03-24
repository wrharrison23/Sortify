import { SpotifyContext } from "../Providers/SpotifyProvider";
import React, { useState, useContext, useEffect } from "react";
import { SongCard } from "./SongCard";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import SaveAltIcon from "@material-ui/icons/SaveAlt";
import Button from "@material-ui/core/Button";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
import Card from "@material-ui/core/Card";

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
  songCard: {
    display: "flex",
    height: 60,
    width: 400,
    backgroundColor: "#EEFBFB",
    borderRadius: 0,
  },
  details: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  content: {
    flex: "1 0 auto",
  },
  cover: {
    width: 100,
    height: "100%",
  },
  delete: {
    height: 20,
    width: 20,
    backgroundColor: "blue",
  },
  trackName: {
    fontSize: "5rem",
  },
  margin: {
    spacing: 0,
  },
}));

const theme = createMuiTheme({
  typography: {
    h5: {
      fontSize: 17,
    },
    subtitle1: {
      fontSize: 12,
    },
    button: {
      fontStyle: "italic",
    },
  },
});
export const SongList = () => {
  const {
    chillArray,
    sadArray,
    intenseArray,
    danceArray,
    feelGoodArray,
    setChillArray,
    setSadArray,
    setIntenseArray,
    setDanceArray,
    setFeelGoodArray,
    savePlaylist,
    getTopTracks,
    getFeatures,
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

  const handleDelete = (songId, playlist) => {
    let filteredPlaylist = playlist.filter((song) => {
      return song.id !== songId
    })
    if (playlist === chillArray) {
      setChillArray(filteredPlaylist)
    } else if (playlist === sadArray) {
      setSadArray(filteredPlaylist)
  } else if (playlist === intenseArray) {
      setIntenseArray(filteredPlaylist)
  } else if (playlist === danceArray) {
      setDanceArray(filteredPlaylist)
  } else if (playlist === feelGoodArray) {
      setFeelGoodArray(filteredPlaylist)
  } 
  }
  return (
    <>
      {/* <button onClick={buildMoodLists}>Get moods</button> */}
      <Grid container className={classes.container}>
        <div className={classes.root}>
          <Grid item xs={5}>
            <h3>Party</h3>
            <div>
              {danceArray?.map((track) => {
                return (
                  <Card className={classes.songCard} key={track.id}>
                    <CardMedia
                      component="img"
                      className={classes.cover}
                      src={track.imageUrl}
                    />

                    <Grid
                      container
                      direction="row"
                      justify="flex-end"
                      alignItems="center"
                      style={{ backgroundColor: "white" }}
                    >
                      <CardContent
                        className={classes.content}
                        style={{ backgroundColor: "white" }}
                      >
                        <ThemeProvider theme={theme}>
                          <Typography
                            component="h5"
                            variant="h5"
                            className="trackName"
                            style={{ backgroundColor: "white" }}
                          >
                            {track.name}
                          </Typography>
                          <Typography
                            variant="subtitle1"
                            color="textSecondary"
                            style={{ backgroundColor: "white" }}
                          >
                            {track.artist}
                          </Typography>
                        </ThemeProvider>
                      </CardContent>
                      <IconButton
                        onClick={() => handleDelete(track.id, danceArray)}
                        aria-label="delete"
                        className={classes.margin}
                        size="small"
                      >
                        <DeleteIcon
                          
                          className="delete"
                          style={{ backgroundColor: "white" }}
                          fontSize="small"
                        />
                      </IconButton>
                    </Grid>
                  </Card>
                );
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
                return (
                  <Card className={classes.songCard} key={track.id}>
                    <CardMedia
                      component="img"
                      className={classes.cover}
                      src={track.imageUrl}
                    />

                    <Grid
                      container
                      direction="row"
                      justify="flex-end"
                      alignItems="center"
                      style={{ backgroundColor: "white" }}
                    >
                      <CardContent
                        className={classes.content}
                        style={{ backgroundColor: "white" }}
                      >
                        <ThemeProvider theme={theme}>
                          <Typography
                            component="h5"
                            variant="h5"
                            className="trackName"
                            style={{ backgroundColor: "white" }}
                          >
                            {track.name}
                          </Typography>
                          <Typography
                            variant="subtitle1"
                            color="textSecondary"
                            style={{ backgroundColor: "white" }}
                          >
                            {track.artist}
                          </Typography>
                        </ThemeProvider>
                      </CardContent>
                      <IconButton
                        onClick={() => handleDelete(track.id, chillArray)}
                        aria-label="delete"
                        className={classes.margin}
                        size="small"
                      >
                        <DeleteIcon
                          className="delete"
                          style={{ backgroundColor: "white" }}
                          fontSize="small"
                        />
                      </IconButton>
                    </Grid>
                  </Card>
                );
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
                return (
                  <Card className={classes.songCard} key={track.id}>
                    <CardMedia
                      component="img"
                      className={classes.cover}
                      src={track.imageUrl}
                    />

                    <Grid
                      container
                      direction="row"
                      justify="flex-end"
                      alignItems="center"
                      style={{ backgroundColor: "white" }}
                    >
                      <CardContent
                        className={classes.content}
                        style={{ backgroundColor: "white" }}
                      >
                        <ThemeProvider theme={theme}>
                          <Typography
                            component="h5"
                            variant="h5"
                            className="trackName"
                            style={{ backgroundColor: "white" }}
                          >
                            {track.name}
                          </Typography>
                          <Typography
                            variant="subtitle1"
                            color="textSecondary"
                            style={{ backgroundColor: "white" }}
                          >
                            {track.artist}
                          </Typography>
                        </ThemeProvider>
                      </CardContent>
                      <IconButton
                        onClick={() => handleDelete(track.id, feelGoodArray)}
                        aria-label="delete"
                        className={classes.margin}
                        size="small"
                      >
                        <DeleteIcon
                          className="delete"
                          style={{ backgroundColor: "white" }}
                          fontSize="small"
                        />
                      </IconButton>
                    </Grid>
                  </Card>
                );
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
            <h3>Energetic</h3>
            <div>
              {intenseArray?.map((track) => {
                return (
                  <Card className={classes.songCard} key={track.id}>
                    <CardMedia
                      component="img"
                      className={classes.cover}
                      src={track.imageUrl}
                    />

                    <Grid
                      container
                      direction="row"
                      justify="flex-end"
                      alignItems="center"
                      style={{ backgroundColor: "white" }}
                    >
                      <CardContent
                        className={classes.content}
                        style={{ backgroundColor: "white" }}
                      >
                        <ThemeProvider theme={theme}>
                          <Typography
                            component="h5"
                            variant="h5"
                            className="trackName"
                            style={{ backgroundColor: "white" }}
                          >
                            {track.name}
                          </Typography>
                          <Typography
                            variant="subtitle1"
                            color="textSecondary"
                            style={{ backgroundColor: "white" }}
                          >
                            {track.artist}
                          </Typography>
                        </ThemeProvider>
                      </CardContent>
                      <IconButton
                        onClick={() => handleDelete(track.id, intenseArray)}
                        aria-label="delete"
                        className={classes.margin}
                        size="small"
                      >
                        <DeleteIcon
                          className="delete"
                          style={{ backgroundColor: "white" }}
                          fontSize="small"
                        />
                      </IconButton>
                    </Grid>
                  </Card>
                );
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
            return (
              <Card className={classes.songCard} key={track.id}>
                <CardMedia
                  component="img"
                  className={classes.cover}
                  src={track.imageUrl}
                />

                <Grid
                  container
                  direction="row"
                  justify="flex-end"
                  alignItems="center"
                  style={{ backgroundColor: "white" }}
                >
                  <CardContent
                    className={classes.content}
                    style={{ backgroundColor: "white" }}
                  >
                    <ThemeProvider theme={theme}>
                      <Typography
                        component="h5"
                        variant="h5"
                        className="trackName"
                        style={{ backgroundColor: "white" }}
                      >
                        {track.name}
                      </Typography>
                      <Typography
                        variant="subtitle1"
                        color="textSecondary"
                        style={{ backgroundColor: "white" }}
                      >
                        {track.artist}
                      </Typography>
                    </ThemeProvider>
                  </CardContent>
                  <IconButton
                    onClick={() => handleDelete(track.id, sadArray)}
                    aria-label="delete"
                    className={classes.margin}
                    size="small"
                  >
                    <DeleteIcon
                      className="delete"
                      style={{ backgroundColor: "white" }}
                      fontSize="small"
                    />
                  </IconButton>
                </Grid>
              </Card>
            );
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
