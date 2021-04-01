import { SpotifyContext } from "../Providers/SpotifyProvider";
import React, { useState, useContext, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import SaveAltIcon from "@material-ui/icons/SaveAlt";
import Button from "@material-ui/core/Button";
import { createMuiTheme } from "@material-ui/core/styles";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
import { Row, Column, Item } from "@mui-treasury/components/flex";
import {
  Info,
  InfoTitle,
  InfoSubtitle,
} from "@mui-treasury/components/info";
import { useDynamicAvatarStyles } from "@mui-treasury/styles/avatar/dynamic";
import { useD01InfoStyles } from "@mui-treasury/styles/info/d01";
import Avatar from "@material-ui/core/Avatar";
import "../App.css"
import AddIcon from "@material-ui/icons/Add";
import SpotifyPlayer from "react-spotify-web-playback";
import PlayCircleOutlineIcon from "@material-ui/icons/PlayCircleOutline";
import PlaylistPlayIcon from "@material-ui/icons/PlaylistPlay";
import {SearchBar} from "./SearchBar"
import {SongCard} from "./SongCard"
import {RecCard} from "./RecCard"
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import PlaylistAddIcon from "@material-ui/icons/PlaylistAdd";
import ShuffleIcon from "@material-ui/icons/Shuffle";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-evenly",
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
    marginBottom: "2px",
  },
  button: {
    margin: theme.spacing(1),
    backGroundColor: "white",
    width: "100%",
    borderRadius: 20,
  },
  songCard: {
    height: 70,
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
    textOverflow: "ellipsis",
    overflow: "hidden",
    whiteSpace: "nowrap",
    width: "300px",
  },
  margin: {
    spacing: 0,
  },
  header: {
    alignSelf: "center",
  },
  footer: {
    position: "fixed",
    bottom: "0px",
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
    setChillArray,
    setSadArray,
    setIntenseArray,
    setDanceArray,
    setFeelGoodArray,
    savePlaylist,
    getTopTracks,
    getFeatures,
    danceRecs,
    feelGoodRecs,
    intenseRecs,
    chillRecs,
    sadRecs,
    setDanceRecs,
    setChillRecs,
    setIntenseRecs,
    setFeelGoodRecs,
    setSadRecs,
    results,
    setResults,
    searchTracks,
    URIs,
    setUris,
    playState,
    setPlayState,
  } = useContext(SpotifyContext);

  const [openDance, setOpenDance] = useState(false);
  const [openChill, setOpenChill] = useState(false);
  const [openIntense, setOpenIntense] = useState(false);
  const [openFeelGood, setOpenFeelGood] = useState(false);
  const [openSad, setOpenSad] = useState(false);

  const handleClickOpenDance = () => {
    setOpenDance(true);
  };

  const handleCloseDance = () => {
    setOpenDance(false);
  };

  const handleClickOpenChill = () => {
    setOpenChill(true);
  };

  const handleCloseChill = () => {
    setOpenChill(false);
  };

  const handleClickOpenIntense = () => {
    setOpenIntense(true);
  };

  const handleCloseIntense = () => {
    setOpenIntense(false);
  };

  const handleClickOpenFeelGood = () => {
    setOpenFeelGood(true);
  };

  const handleCloseFeelGood = () => {
    setOpenFeelGood(false);
  };

  const handleClickOpenSad = () => {
    setOpenSad(true);
  };

  const handleCloseSad = () => {
    setOpenSad(false);
  };

  const classes = useStyles();
  
  useEffect(() => {
    getTopTracks()
      .then(getFeatures);
  }, []);

    useEffect(() => {
      console.log(results)
    }, [results])
  const handleSavePlaylist = (playlistName, description, songArray) => {
    let uriArray = songArray.map((song) => {
      return `spotify:track:${song.id}`;
    });
    console.log(uriArray)
    savePlaylist(playlistName, description, uriArray);

    console.log("Saved");
  };


  const handlePlaylist = (songArray) => {
    let playlistUris = songArray.map((track) => {
      return `spotify:track:${track.id}`
    })
    let shuffledUris = playlistUris
      .map((a) => ({ sort: Math.random(), value: a }))
      .sort((a, b) => a.sort - b.sort)
      .map((a) => a.value);

    setUris(shuffledUris)
    setPlayState(true);
  }

  const avatarStyles = useDynamicAvatarStyles({ size: 60 });
  const [fullWidth, setFullWidth] = useState(false);
  const [maxWidth, setMaxWidth] = useState("sm");
  return (
    <>
      {/* <button onClick={buildMoodLists}>Get moods</button> */}
      <Grid
        container
        className={classes.root}
        style={{ backgroundColor: "inherit" }}
      >
        <Grid item xs={5}>
          <Column gap={2} width={"100%"} className={classes.col}>
            <h3 className={classes.header}>Party</h3>

            <div style={{ maxHeight: 600, overflow: "auto" }}>
              {danceArray?.map((track) => {
                return <SongCard key={track.id} track={track} />;
              })}
              <h5
                style={{
                  width: "100%",
                  textAlign: "center",
                  borderBottom: "2px",
                  paddingBottom: 1,
                  borderStyle: "solid",
                  borderImage: "linear-gradient(black, transparent) 10",
                  borderTop: 0,
                  borderLeft: 0,
                  borderRight: 0,
                }}
              >
                Recommended Songs
              </h5>
              {danceRecs?.map((track) => {
                return <RecCard key={track.id} track={track} mood={"dance"} />;
              })}
            </div>
            <div width={"100%"} style={{ marginTop: "1em" }}>
              <ButtonGroup
                aria-label="outlined secondary button group"
                size="small"
                fullWidth={true}
              >
                <Button
                  variant="outlined"
                  style={{ backgroundColor: "white", color: "black" }}
                  onClick={handleClickOpenDance}
                  startIcon={<PlaylistAddIcon />}
                >
                  Add a song
                </Button>
                <Dialog
                  open={openDance}
                  onClose={handleCloseDance}
                  aria-labelledby="form-dialog-title"
                  fullWidth={fullWidth}
                  maxWidth={maxWidth}
                >
                  <DialogTitle
                    id="form-dialog-title"
                    style={{ backgroundColor: "#606060", color: "white" }}
                  >
                    Add a song
                  </DialogTitle>
                  <DialogContentText
                    style={{ backgroundColor: "#606060", marginBottom: 0 }}
                  >
                    <SearchBar playlist="dance" />
                    <DialogContentText style={{ backgroundColor: "	#606060" }}>
                      {results.map((track) => {
                        return <RecCard track={track} key={track.id} />;
                      })}
                    </DialogContentText>
                  </DialogContentText>
                  <DialogActions style={{ backgroundColor: "#606060" }}>
                    <Button onClick={handleCloseDance}>Close</Button>
                  </DialogActions>
                </Dialog>

                <Button
                  variant="contained"
                  color="default"
                  style={{ backgroundColor: "white", color: "black" }}
                  // className={classes.button}
                  startIcon={<ShuffleIcon />}
                  onClick={() => {
                    handlePlaylist(danceArray);
                  }}
                >
                  Shuffle Playlist
                </Button>
                <Button
                  variant="contained"
                  color="default"
                  style={{ backgroundColor: "white", color: "black" }}
                  // className={classes.button}
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
              </ButtonGroup>
            </div>
          </Column>
        </Grid>

        <Grid item xs={5}>
          <Column gap={1}>
            <h3 className={classes.header}>Feel-good</h3>

            <div style={{ maxHeight: 600, overflow: "auto" }}>
              {feelGoodArray?.map((track) => {
                return <SongCard key={track.id} track={track} />;
              })}
              <h5
                style={{
                  width: "100%",
                  textAlign: "center",
                  borderBottom: "2px",
                  paddingBottom: 1,
                  borderStyle: "solid",
                  borderImage: "linear-gradient(black, transparent) 10",
                  borderTop: 0,
                  borderLeft: 0,
                  borderRight: 0,
                }}
              >
                Recommended Songs
              </h5>
              <div>
                {feelGoodRecs?.map((track) => {
                  return <RecCard key={track.id} track={track} />;
                })}
              </div>
            </div>
            <div width={"100%"} style={{ marginTop: "1em" }}>
              <ButtonGroup
                aria-label="outlined secondary button group"
                size="small"
                fullWidth={true}
              >
                <Button
                  variant="outlined"
                  style={{ backgroundColor: "white", color: "black" }}
                  onClick={handleClickOpenFeelGood}
                  startIcon={<PlaylistAddIcon />}
                >
                  Add a song
                </Button>
                <Dialog
                  open={openFeelGood}
                  onClose={handleCloseFeelGood}
                  aria-labelledby="form-dialog-title"
                  fullWidth={fullWidth}
                  maxWidth={maxWidth}
                >
                  <DialogTitle
                    id="form-dialog-title"
                    style={{ backgroundColor: "#606060", color: "white" }}
                  >
                    Add a song
                  </DialogTitle>
                  <DialogContentText
                    style={{ backgroundColor: "#606060", marginBottom: 0 }}
                  >
                    <SearchBar playlist="feelGood" />
                    <DialogContentText style={{ backgroundColor: "	#606060" }}>
                      {results.map((track) => {
                        return <RecCard track={track} key={track.id} />;
                      })}
                    </DialogContentText>
                  </DialogContentText>
                  <DialogActions style={{ backgroundColor: "#606060" }}>
                    <Button onClick={handleCloseFeelGood}>Close</Button>
                  </DialogActions>
                </Dialog>

                <Button
                  variant="contained"
                  color="default"
                  style={{ backgroundColor: "white", color: "black" }}
                  // className={classes.button}
                  startIcon={<ShuffleIcon />}
                  onClick={() => {
                    handlePlaylist(feelGoodArray);
                  }}
                >
                  Shuffle Playlist
                </Button>
                <Button
                  variant="contained"
                  color="default"
                  style={{ backgroundColor: "white", color: "black" }}
                  // className={classes.button}
                  startIcon={<SaveAltIcon />}
                  onClick={() =>
                    handleSavePlaylist(
                      "Sortify - Dance",
                      "Songs to dance to - created by Sortify",
                      feelGoodArray
                    )
                  }
                >
                  Save
                </Button>
              </ButtonGroup>
            </div>
          </Column>
        </Grid>

        <Grid item xs={5}>
          <Column gap={1}>
            <h3 className={classes.header}>Energetic</h3>

            <div style={{ maxHeight: 600, overflow: "auto" }}>
              {intenseArray?.map((track) => {
                return <SongCard key={track.id} track={track} />;
              })}
              <h5
                style={{
                  width: "100%",
                  textAlign: "center",
                  borderBottom: "2px",
                  paddingBottom: 1,
                  borderStyle: "solid",
                  borderImage: "linear-gradient(black, transparent) 10",
                  borderTop: 0,
                  borderLeft: 0,
                  borderRight: 0,
                }}
              >
                Recommended Songs
              </h5>
              {intenseRecs?.map((track) => {
                return <RecCard key={track.id} track={track} />;
              })}
            </div>
            <div width={"100%"} style={{ marginTop: "1em" }}>
              <ButtonGroup
                aria-label="outlined secondary button group"
                size="small"
                fullWidth={true}
              >
                <Button
                  variant="outlined"
                  style={{ backgroundColor: "white", color: "black" }}
                  onClick={handleClickOpenIntense}
                  startIcon={<PlaylistAddIcon />}
                >
                  Add a song
                </Button>
                <Dialog
                  open={openIntense}
                  onClose={handleCloseIntense}
                  aria-labelledby="form-dialog-title"
                  fullWidth={fullWidth}
                  maxWidth={maxWidth}
                >
                  <DialogTitle
                    id="form-dialog-title"
                    style={{ backgroundColor: "#606060", color: "white" }}
                  >
                    Add a song
                  </DialogTitle>
                  <DialogContentText
                    style={{ backgroundColor: "#606060", marginBottom: 0 }}
                  >
                    <SearchBar playlist="intense" />
                    <DialogContentText style={{ backgroundColor: "	#606060" }}>
                      {results.map((track) => {
                        return <RecCard track={track} key={track.id} />;
                      })}
                    </DialogContentText>
                  </DialogContentText>
                  <DialogActions style={{ backgroundColor: "#606060" }}>
                    <Button onClick={handleCloseIntense}>Close</Button>
                  </DialogActions>
                </Dialog>

                <Button
                  variant="contained"
                  color="default"
                  style={{ backgroundColor: "white", color: "black" }}
                  // className={classes.button}
                  startIcon={<ShuffleIcon />}
                  onClick={() => {
                    handlePlaylist(intenseArray);
                  }}
                >
                  Shuffle Playlist
                </Button>
                <Button
                  variant="contained"
                  color="default"
                  style={{ backgroundColor: "white", color: "black" }}
                  // className={classes.button}
                  startIcon={<SaveAltIcon />}
                  onClick={() =>
                    handleSavePlaylist(
                      "Sortify - Dance",
                      "Songs to dance to - created by Sortify",
                      intenseArray
                    )
                  }
                >
                  Save
                </Button>
              </ButtonGroup>
            </div>
          </Column>
        </Grid>

        <Grid item xs={5}>
          <Column gap={1}>
            <h3 className={classes.header}>Chill</h3>
            <div style={{ maxHeight: 600, overflow: "auto" }}>
              {chillArray?.map((track) => {
                return <SongCard key={track.id} track={track} />;
              })}
              <h5
                style={{
                  width: "100%",
                  textAlign: "center",
                  borderBottom: "2px",
                  paddingBottom: 1,
                  borderStyle: "solid",
                  borderImage: "linear-gradient(black, transparent) 10",
                  borderTop: 0,
                  borderLeft: 0,
                  borderRight: 0,
                }}
              >
                Recommended Songs
              </h5>
              {chillRecs?.map((track) => {
                return <RecCard key={track.id} track={track} />;
              })}
            </div>
            <div width={"100%"} style={{ marginTop: "1em" }}>
              <ButtonGroup
                aria-label="outlined secondary button group"
                size="small"
                fullWidth={true}
              >
                <Button
                  variant="outlined"
                  style={{ backgroundColor: "white", color: "black" }}
                  onClick={handleClickOpenChill}
                  startIcon={<PlaylistAddIcon />}
                >
                  Add a song
                </Button>
                <Dialog
                  open={openChill}
                  onClose={handleCloseChill}
                  aria-labelledby="form-dialog-title"
                  fullWidth={fullWidth}
                  maxWidth={maxWidth}
                >
                  <DialogTitle
                    id="form-dialog-title"
                    style={{ backgroundColor: "#606060", color: "white" }}
                  >
                    Add a song
                  </DialogTitle>
                  <DialogContentText
                    style={{ backgroundColor: "#606060", marginBottom: 0 }}
                  >
                    <SearchBar playlist={"chill"} />
                    <DialogContentText style={{ backgroundColor: "	#606060" }}>
                      {results.map((track) => {
                        return <RecCard track={track} key={track.id} />;
                      })}
                    </DialogContentText>
                  </DialogContentText>
                  <DialogActions style={{ backgroundColor: "#606060" }}>
                    <Button onClick={handleCloseChill}>Close</Button>
                  </DialogActions>
                </Dialog>

                <Button
                  variant="contained"
                  color="default"
                  style={{ backgroundColor: "white", color: "black" }}
                  // className={classes.button}
                  startIcon={<ShuffleIcon />}
                  onClick={() => {
                    handlePlaylist(chillArray);
                  }}
                >
                  Shuffle Playlist
                </Button>
                <Button
                  variant="contained"
                  color="default"
                  style={{ backgroundColor: "white", color: "black" }}
                  // className={classes.button}
                  startIcon={<SaveAltIcon />}
                  onClick={() =>
                    handleSavePlaylist(
                      "Sortify - Dance",
                      "Songs to dance to - created by Sortify",
                      chillArray
                    )
                  }
                >
                  Save
                </Button>
              </ButtonGroup>
            </div>
          </Column>
        </Grid>

        <Grid item xs={5}>
          <Column gap={1}>
            <h3 className={classes.header}>Sad</h3>
           
            <div style={{ maxHeight: 600, overflow: "auto" }}>
              {sadArray?.map((track) => {
                return <SongCard key={track.id} track={track} />;
              })}
              <h5
                style={{
                  width: "100%",
                  textAlign: "center",
                  borderBottom: "2px",
                  paddingBottom: 1,
                  borderStyle: "solid",
                  borderImage: "linear-gradient(black, transparent) 10",
                  borderTop: 0,
                  borderLeft: 0,
                  borderRight: 0,
                }}
              >
                Recommended Songs
              </h5>
              {sadRecs?.map((track) => {
                return <RecCard key={track.id} track={track} />;
              })}
            </div>
            <div width={"100%"} style={{ marginTop: "1em", marginBottom:"4em" }}>
              <ButtonGroup
                aria-label="outlined secondary button group"
                size="small"
                fullWidth={true}
              >
                <Button
                  variant="outlined"
                  style={{ backgroundColor: "white", color: "black" }}
                  onClick={handleClickOpenSad}
                  startIcon={<PlaylistAddIcon />}
                >
                  Add a song
                </Button>
                <Dialog
                  open={openSad}
                  onClose={handleCloseSad}
                  aria-labelledby="form-dialog-title"
                  fullWidth={fullWidth}
                  maxWidth={maxWidth}
                >
                  <DialogTitle
                    id="form-dialog-title"
                    style={{ backgroundColor: "#606060", color: "white" }}
                  >
                    Add a song
                  </DialogTitle>
                  <DialogContentText
                    style={{ backgroundColor: "#606060", marginBottom: 0 }}
                  >
                    <SearchBar playlist={"sad"} />
                    <DialogContentText style={{ backgroundColor: "	#606060" }}>
                      {results.map((track) => {
                        return <RecCard track={track} key={track.id} />;
                      })}
                    </DialogContentText>
                  </DialogContentText>
                  <DialogActions style={{ backgroundColor: "#606060" }}>
                    <Button onClick={handleCloseSad}>Close</Button>
                  </DialogActions>
                </Dialog>

                <Button
                  variant="contained"
                  color="default"
                  style={{ backgroundColor: "white", color: "black" }}
                  // className={classes.button}
                  startIcon={<ShuffleIcon />}
                  onClick={() => {
                    handlePlaylist(sadArray);
                  }}
                >
                  Shuffle Playlist
                </Button>
                <Button
                  variant="contained"
                  color="default"
                  style={{ backgroundColor: "white", color: "black" }}
                  // className={classes.button}
                  startIcon={<SaveAltIcon />}
                  onClick={() =>
                    handleSavePlaylist(
                      "Sortify - Dance",
                      "Songs to dance to - created by Sortify",
                      sadArray
                    )
                  }
                >
                  Save
                </Button>
              </ButtonGroup>
            </div>
          </Column>
        </Grid>
        <footer className={classes.footer}>
          {URIs.length !== 0 ? (
            <SpotifyPlayer
              token={localStorage.getItem("accessToken")}
              uris={URIs}
              play={playState}
              initialVolume={0.5}
              styles={{
                sliderColor: "#3a7bd5",
              }}
            />
          ) : (
            <div></div>
          )}
        </footer>
      </Grid>
    </>
  );
};
