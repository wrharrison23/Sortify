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
    let filteredPlaylist = playlist.filter((song) => {
      return song.id !== songId;
    });
    if (playlist === chillArray) {
      setChillArray(filteredPlaylist);
    } else if (playlist === sadArray) {
      setSadArray(filteredPlaylist);
    } else if (playlist === intenseArray) {
      setIntenseArray(filteredPlaylist);
    } else if (playlist === danceArray) {
      setDanceArray(filteredPlaylist);
    } else if (playlist === feelGoodArray) {
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