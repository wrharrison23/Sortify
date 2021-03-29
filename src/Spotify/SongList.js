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
    width:"310px"
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
  } = useContext(SpotifyContext);

  const classes = useStyles();
  const [URIs, setUris] = useState([])
  const [playState, setPlayState] = useState(false)

  useEffect(() => {
    getTopTracks()
      .then(getFeatures)
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

  const handleAddSong = (rec, songArray, recArray) => {
    let filteredPlaylist = recArray.filter((song) => {
      return song.id !== rec.id;
    });
    if (songArray === chillArray) {
      setChillArray((prevArray) => [...prevArray, rec]);
      setChillRecs(filteredPlaylist)
    } else if (songArray === sadArray) {
      setSadArray((prevArray) => [...prevArray, rec]);
      setSadRecs(filteredPlaylist)
    } else if (songArray === intenseArray) {
      setIntenseArray((prevArray) => [...prevArray, rec]);
      setIntenseRecs(filteredPlaylist)
    } else if (songArray === danceArray) {
      setDanceArray(prevArray => [...prevArray, rec]);
      setDanceRecs(filteredPlaylist);
    } else if (songArray === feelGoodArray) {
      setFeelGoodArray((prevArray) => [...prevArray, rec]);
      setFeelGoodRecs(filteredPlaylist)
    }
  }

  const handlePlaySong = (track) => {
    let trackUri = `spotify:track:${track.id}`
    setUris(trackUri)
    setPlayState(true)
  }

  const avatarStyles = useDynamicAvatarStyles({ size: 60 });

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
                return (
                  <Row key={track.id} className={classes.songCard}>
                    <Item>
                      <Avatar
                        variant={"rounded"}
                        classes={avatarStyles}
                        src={track.imageUrl}
                      />
                    </Item>
                    <Info useStyles={useD01InfoStyles}>
                      <InfoTitle className={classes.trackName}>
                        {track.name}
                      </InfoTitle>
                      <InfoSubtitle>{track.artist}</InfoSubtitle>
                    </Info>
                    <Item position={"right"}>
                      <IconButton
                        onClick={() => handleDelete(track.id, danceArray)}
                        aria-label="delete"
                        className={classes.margin}
                        size="small"
                      >
                        <DeleteIcon
                          style={{ backgroundColor: "inherit", color: "white" }}
                          fontSize="small"
                        />
                      </IconButton>
                    </Item>
                  </Row>
                );
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
                return (
                  <Row key={track.id} className={classes.songCard}>
                    <Item>
                      <Avatar
                        variant={"rounded"}
                        classes={avatarStyles}
                        src={track.imageUrl}
                      />
                    </Item>
                    <Info useStyles={useD01InfoStyles}>
                      <InfoTitle className={classes.trackName}>
                        {track.name}
                      </InfoTitle>
                      <InfoSubtitle>{track.artist}</InfoSubtitle>
                    </Info>
                    <Item position={"right"}>
                      <IconButton
                        onClick={() =>
                          handleAddSong(track, danceArray, danceRecs)
                        }
                        aria-label="delete"
                        className={classes.margin}
                        size="small"
                      >
                        <AddIcon
                          style={{
                            backgroundColor: "inherit",
                            color: "white",
                          }}
                          fontSize="small"
                        />
                      </IconButton>
                      <IconButton onClick={() => handlePlaySong(track)}>
                        <PlayCircleOutlineIcon
                          style={{
                            backgroundColor: "inherit",
                            color: "white",
                          }}
                          fontSize="small"
                        />
                      </IconButton>
                    </Item>
                  </Row>
                );
              })}
            </div>
            <Button
              variant="contained"
              color="default"
              size="large"
              style={{ backgroundColor: "white", color: "black" }}
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
          </Column>
        </Grid>

        <Grid item xs={5}>
          <Column gap={1}>
            <h3 className={classes.header}>Feel-good</h3>
            <div style={{ maxHeight: 600, overflow: "auto" }}>
              {feelGoodArray?.map((track) => {
                return (
                  <Row key={track.id} className={classes.songCard}>
                    <Item>
                      <Avatar
                        variant={"rounded"}
                        classes={avatarStyles}
                        src={track.imageUrl}
                      />
                    </Item>
                    <Info useStyles={useD01InfoStyles}>
                      <InfoTitle className={classes.trackName}>
                        {track.name}
                      </InfoTitle>
                      <InfoSubtitle>{track.artist}</InfoSubtitle>
                    </Info>
                    <Item position={"right"}>
                      <IconButton
                        onClick={() => handleDelete(track.id, feelGoodArray)}
                        aria-label="delete"
                        className={classes.margin}
                        size="small"
                      >
                        <DeleteIcon
                          style={{ backgroundColor: "inherit", color: "white" }}
                          fontSize="small"
                        />
                      </IconButton>
                    </Item>
                  </Row>
                );
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
                  return (
                    <Row key={track.id} className={classes.songCard}>
                      <Item>
                        <Avatar
                          variant={"rounded"}
                          classes={avatarStyles}
                          src={track.imageUrl}
                        />
                      </Item>
                      <Info useStyles={useD01InfoStyles}>
                        <InfoTitle className={classes.trackName}>
                          {track.name}
                        </InfoTitle>
                        <InfoSubtitle>{track.artist}</InfoSubtitle>
                      </Info>
                      <Item position={"right"}>
                        <IconButton
                          onClick={() =>
                            handleAddSong(track, feelGoodArray, feelGoodRecs)
                          }
                          aria-label="delete"
                          className={classes.margin}
                          size="small"
                        >
                          <AddIcon
                            style={{
                              backgroundColor: "inherit",
                              color: "white",
                            }}
                            fontSize="small"
                          />
                        </IconButton>
                        <IconButton onClick={() => handlePlaySong(track)}>
                          <PlayCircleOutlineIcon
                            style={{
                              backgroundColor: "inherit",
                              color: "white",
                            }}
                            fontSize="small"
                          />
                        </IconButton>
                      </Item>
                    </Row>
                  );
                })}
              </div>
            </div>

            <Button
              variant="contained"
              color="default"
              size="large"
              style={{ backgroundColor: "white", color: "black" }}
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
          </Column>
        </Grid>

        <Grid item xs={5}>
          <Column gap={1}>
            <h3 className={classes.header}>Energetic</h3>
            <div style={{ maxHeight: 600, overflow: "auto" }}>
              {intenseArray?.map((track) => {
                return (
                  <Row key={track.id} className={classes.songCard}>
                    <Item>
                      <Avatar
                        variant={"rounded"}
                        classes={avatarStyles}
                        src={track.imageUrl}
                      />
                    </Item>
                    <Info useStyles={useD01InfoStyles}>
                      <InfoTitle className={classes.trackName}>
                        {track.name}
                      </InfoTitle>
                      <InfoSubtitle>{track.artist}</InfoSubtitle>
                    </Info>
                    <Item position={"right"}>
                      <IconButton
                        onClick={() => handleDelete(track.id, intenseArray)}
                        aria-label="delete"
                        className={classes.margin}
                        size="small"
                      >
                        <DeleteIcon
                          style={{ backgroundColor: "inherit", color: "white" }}
                          fontSize="small"
                        />
                      </IconButton>
                    </Item>
                  </Row>
                );
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
                return (
                  <Row key={track.id} className={classes.songCard}>
                    <Item>
                      <Avatar
                        variant={"rounded"}
                        classes={avatarStyles}
                        src={track.imageUrl}
                      />
                    </Item>
                    <Info useStyles={useD01InfoStyles}>
                      <InfoTitle className={classes.trackName}>
                        {track.name}
                      </InfoTitle>
                      <InfoSubtitle>{track.artist}</InfoSubtitle>
                    </Info>
                    <Item position={"right"}>
                      <IconButton
                        onClick={() =>
                          handleAddSong(track, intenseArray, intenseRecs)
                        }
                        aria-label="delete"
                        className={classes.margin}
                        size="small"
                      >
                        <AddIcon
                          style={{
                            backgroundColor: "inherit",
                            color: "white",
                          }}
                          fontSize="small"
                        />
                      </IconButton>
                      <IconButton onClick={() => handlePlaySong(track)}>
                        <PlayCircleOutlineIcon
                          style={{
                            backgroundColor: "inherit",
                            color: "white",
                          }}
                          fontSize="small"
                        />
                      </IconButton>
                    </Item>
                  </Row>
                );
              })}
            </div>

            <Button
              variant="contained"
              color="default"
              size="large"
              style={{ backgroundColor: "white", color: "black" }}
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
          </Column>
        </Grid>

        <Grid item xs={5}>
          <Column gap={1}>
            <h3 className={classes.header}>Chill</h3>
            <div style={{ maxHeight: 600, overflow: "auto" }}>
              {chillArray?.map((track) => {
                return (
                  <Row key={track.id} className={classes.songCard}>
                    <Item>
                      <Avatar
                        variant={"rounded"}
                        classes={avatarStyles}
                        src={track.imageUrl}
                      />
                    </Item>
                    <Info useStyles={useD01InfoStyles}>
                      <InfoTitle className={classes.trackName}>
                        {track.name}
                      </InfoTitle>
                      <InfoSubtitle>{track.artist}</InfoSubtitle>
                    </Info>
                    <Item position={"right"}>
                      <IconButton
                        onClick={() => handleDelete(track.id, chillArray)}
                        aria-label="delete"
                        className={classes.margin}
                        size="small"
                      >
                        <DeleteIcon
                          style={{ backgroundColor: "inherit", color: "white" }}
                          fontSize="small"
                        />
                      </IconButton>
                    </Item>
                  </Row>
                );
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
                return (
                  <Row key={track.id} className={classes.songCard}>
                    <Item>
                      <Avatar
                        variant={"rounded"}
                        classes={avatarStyles}
                        src={track.imageUrl}
                      />
                    </Item>
                    <Info useStyles={useD01InfoStyles}>
                      <InfoTitle className={classes.trackName}>
                        {track.name}
                      </InfoTitle>
                      <InfoSubtitle>{track.artist}</InfoSubtitle>
                    </Info>
                    <Item position={"right"}>
                      <IconButton
                        onClick={() =>
                          handleAddSong(track, chillArray, chillRecs)
                        }
                        aria-label="delete"
                        className={classes.margin}
                        size="small"
                      >
                        <AddIcon
                          style={{
                            backgroundColor: "inherit",
                            color: "white",
                          }}
                          fontSize="small"
                        />
                      </IconButton>
                      <IconButton onClick={() => handlePlaySong(track)}>
                        <PlayCircleOutlineIcon
                          style={{
                            backgroundColor: "inherit",
                            color: "white",
                          }}
                          fontSize="small"
                        />
                      </IconButton>
                    </Item>
                  </Row>
                );
              })}
            </div>
            <Button
              variant="contained"
              color="default"
              size="large"
              style={{ backgroundColor: "white", color: "black" }}
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
          </Column>
        </Grid>

        <Grid item xs={5}>
          <Column gap={1}>
            <h3 className={classes.header}>Sad</h3>
            <div style={{ maxHeight: 600, overflow: "auto" }}>
              {sadArray?.map((track) => {
                return (
                  <Row key={track.id} className={classes.songCard}>
                    <Item>
                      <Avatar
                        variant={"rounded"}
                        classes={avatarStyles}
                        src={track.imageUrl}
                      />
                    </Item>
                    <Info useStyles={useD01InfoStyles}>
                      <InfoTitle className={classes.trackName}>
                        {track.name}
                      </InfoTitle>
                      <InfoSubtitle>{track.artist}</InfoSubtitle>
                    </Info>
                    <Item position={"right"}>
                      <IconButton
                        onClick={() => handleDelete(track.id, sadArray)}
                        aria-label="delete"
                        className={classes.margin}
                        size="small"
                      >
                        <DeleteIcon
                          style={{ backgroundColor: "inherit", color: "white" }}
                          fontSize="small"
                        />
                      </IconButton>
                    </Item>
                  </Row>
                );
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
                return (
                  <Row key={track.id} className={classes.songCard}>
                    <Item>
                      <Avatar
                        variant={"rounded"}
                        classes={avatarStyles}
                        src={track.imageUrl}
                      />
                    </Item>
                    <Info useStyles={useD01InfoStyles}>
                      <InfoTitle className={classes.trackName}>
                        {track.name}
                      </InfoTitle>
                      <InfoSubtitle>{track.artist}</InfoSubtitle>
                    </Info>
                    <Item position={"right"}>
                      <IconButton
                        onClick={() => handleAddSong(track, sadArray, sadRecs)}
                        aria-label="delete"
                        className={classes.margin}
                        size="small"
                      >
                        <AddIcon
                          style={{
                            backgroundColor: "inherit",
                            color: "white",
                          }}
                          fontSize="small"
                        />
                      </IconButton>
                      <IconButton onClick={() => handlePlaySong(track)}>
                        <PlayCircleOutlineIcon
                          style={{
                            backgroundColor: "inherit",
                            color: "white",
                          }}
                          fontSize="small"
                        />
                      </IconButton>
                    </Item>
                  </Row>
                );
              })}
            </div>

            <Button
              variant="contained"
              color="default"
              size="large"
              style={{ backgroundColor: "white", color: "black" }}
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
          </Column>
        </Grid>
        <footer className={classes.footer}>
          {URIs.length !== 0 ? (
            <SpotifyPlayer
              token={localStorage.getItem("accessToken")}
              uris={URIs}
              play={playState}
              initialVolume={.75}
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
