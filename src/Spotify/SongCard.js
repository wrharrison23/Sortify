import { SpotifyContext } from "../Providers/SpotifyProvider";
import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
import { Row, Item } from "@mui-treasury/components/flex";
import { Info, InfoTitle, InfoSubtitle } from "@mui-treasury/components/info";
import { useDynamicAvatarStyles } from "@mui-treasury/styles/avatar/dynamic";
import { useD01InfoStyles } from "@mui-treasury/styles/info/d01";
import Avatar from "@material-ui/core/Avatar";
import "../App.css";
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
    width: "280px",
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

export const SongCard = ( {track} ) => {
  const classes = useStyles();
  
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
    setUris,
    setPlayState,
  } = useContext(SpotifyContext);

  const avatarStyles = useDynamicAvatarStyles({ size: 60 });

  const handleDelete = (songId, playlist) => {
    let moodPlaylist
    
    if (playlist === "chill") {
      moodPlaylist = chillArray
    } else if (playlist === "sad") {
      moodPlaylist = sadArray;
    } else if (playlist === "intense") {
      moodPlaylist = intenseArray;
    } else if (playlist === "dance") {
      moodPlaylist = danceArray;
    } else if (playlist === "feelGood") {
      moodPlaylist = feelGoodArray;
    }
    
    let filteredPlaylist = moodPlaylist.filter((song) => {
      return song.id !== songId;
    });

    if (playlist === "chill") {
      setChillArray(filteredPlaylist);
    } else if (playlist === "sad") {
      setSadArray(filteredPlaylist);
    } else if (playlist === "intense") {
      setIntenseArray(filteredPlaylist);
    } else if (playlist === "dance") {
      setDanceArray(filteredPlaylist);
    } else if (playlist === "feelGood") {
      setFeelGoodArray(filteredPlaylist);
    }
  };

  const handlePlaySong = (track) => {
    let trackUri = `spotify:track:${track.id}`;
    setUris(trackUri);
    setPlayState(true);
  };

  return (
    <>
    <Row className={classes.songCard}>
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
              
              handleDelete(track.id, track.playlist)}
                        aria-label="delete"
                        className={classes.margin}
                        size="small"
                      >
                        <DeleteIcon
                          style={{ backgroundColor: "inherit", color: "white" }}
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
                  </>
  )  
}