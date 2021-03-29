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
import { Row, Column, Item } from "@mui-treasury/components/flex";
import {
  Info,
  InfoTitle,
  InfoSubtitle,
  InfoCaption,
} from "@mui-treasury/components/info";
import { useDynamicAvatarStyles } from "@mui-treasury/styles/avatar/dynamic";
import { useD01InfoStyles } from "@mui-treasury/styles/info/d01";
import Avatar from "@material-ui/core/Avatar";
import "../App.css"
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import AddIcon from "@material-ui/icons/Add";
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
    borderRadius: 20
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
    fontSize: "5rem",
  },
  margin: {
    spacing: 0,
  },
  header:{
    alignSelf: "center"
  }
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
    getRecommendations,
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
    let newPlaylist = songArray.push(rec)
    let filteredPlaylist = recArray.filter((song) => {
      return song.id !== rec.id;
    });
    if (songArray === chillArray) {
      setChillArray(newPlaylist);
      setChillRecs(filteredPlaylist)
    } else if (songArray === sadArray) {
      setSadArray(newPlaylist);
      setSadRecs(filteredPlaylist)
    } else if (songArray === intenseArray) {
      setIntenseArray(newPlaylist);
      setIntenseRecs(filteredPlaylist)
    } else if (songArray === danceArray) {
      setDanceArray(newPlaylist);
      setDanceRecs(filteredPlaylist);
    } else if (songArray === feelGoodArray) {
      setFeelGoodArray(newPlaylist);
      setFeelGoodRecs(filteredPlaylist)
    }
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
                      <InfoTitle>{track.name}</InfoTitle>
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
              <h5>Recommended Songs</h5>
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
                      <InfoTitle>{track.name}</InfoTitle>
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
                      <InfoTitle>{track.name}</InfoTitle>
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
              <h5>Recommended Songs</h5>
              <div style={{borderTop:"1px solid black"}}>
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
                      <InfoTitle>{track.name}</InfoTitle>
                      <InfoSubtitle>{track.artist}</InfoSubtitle>
                    </Info>
                    <Item position={"right"}>
                      <IconButton
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
                      <InfoTitle>{track.name}</InfoTitle>
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
              <h5>Recommended Songs</h5>
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
                      <InfoTitle>{track.name}</InfoTitle>
                      <InfoSubtitle>{track.artist}</InfoSubtitle>
                    </Info>
                    <Item position={"right"}>
                      <IconButton
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
                      <InfoTitle>{track.name}</InfoTitle>
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
              <h5>Recommended Songs</h5>
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
                      <InfoTitle>{track.name}</InfoTitle>
                      <InfoSubtitle>{track.artist}</InfoSubtitle>
                    </Info>
                    <Item position={"right"}>
                      <IconButton
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
                      <InfoTitle>{track.name}</InfoTitle>
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
              <h5>Recommended Songs</h5>
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
                      <InfoTitle>{track.name}</InfoTitle>
                      <InfoSubtitle>{track.artist}</InfoSubtitle>
                    </Info>
                    <Item position={"right"}>
                      <IconButton
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
      </Grid>
    </>
  );
};
