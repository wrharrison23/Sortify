import { SpotifyContext } from "../Providers/SpotifyProvider";
import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import { Row, Item } from "@mui-treasury/components/flex";
import { Info, InfoTitle, InfoSubtitle } from "@mui-treasury/components/info";
import { useDynamicAvatarStyles } from "@mui-treasury/styles/avatar/dynamic";
import { useD01InfoStyles } from "@mui-treasury/styles/info/d01";
import Avatar from "@material-ui/core/Avatar";
import "../App.css";
import AddIcon from "@material-ui/icons/Add";
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

export const RecCard = ( {track} ) => {
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
    setUris,
    setPlayState,
    setResults,
    results
  } = useContext(SpotifyContext);

  

  const avatarStyles = useDynamicAvatarStyles({ size: 60 });

  const handleAddSong = (rec) => {
    debugger
    if (rec.type === "rec"){
      if (rec.playlist === "chill") {
        let filteredPlaylist = chillRecs.filter((song) => {
          return song.id !== rec.id;
        });
        setChillArray((prevArray) => [...prevArray, rec]);
        setChillRecs(filteredPlaylist);
      } else if (rec.playlist === "sad") {
        let filteredPlaylist = sadRecs.filter((song) => {
          return song.id !== rec.id;
        });
        setSadArray((prevArray) => [...prevArray, rec]);
        setSadRecs(filteredPlaylist);
      } else if (rec.playlist === "intense") {
        let filteredPlaylist = intenseRecs.filter((song) => {
          return song.id !== rec.id;
        });
        setIntenseArray((prevArray) => [...prevArray, rec]);
        setIntenseRecs(filteredPlaylist);
      } else if (rec.playlist === "dance") {
        let filteredPlaylist = intenseRecs.filter((song) => {
          return song.id !== rec.id;
        });
        setDanceArray((prevArray) => [...prevArray, rec]);
        setDanceRecs(filteredPlaylist);
      } else if (rec.playlist === "feelGood") {
        let filteredPlaylist = feelGoodRecs.filter((song) => {
          return song.id !== rec.id;
        });
        setFeelGoodArray((prevArray) => [...prevArray, rec]);
        setFeelGoodRecs(filteredPlaylist);
      }
      debugger
    } 
    else if (rec.type == "searchResult"){
      debugger
      if (rec.playlist.playlist === "chill") {
        setChillArray((prevArray) => [...prevArray, rec]);
        setResults([])
      } else if (rec.playlist.playlist === "sad") {
        setSadArray((prevArray) => [...prevArray, rec]);
        setResults([]);
      } else if (rec.playlist.playlist === "intense") {
        setIntenseArray((prevArray) => [...prevArray, rec]);
        setResults([]);
      } else if (rec.playlist.playlist === "dance") {
        setDanceArray((prevArray) => [...prevArray, rec]);
        setResults([]);
      } else if (rec.playlist.playlist === "feelGood") {
        setFeelGoodArray((prevArray) => [...prevArray, rec]);
        setResults([]);
      }
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
          <InfoTitle className={classes.trackName}>{track.name}</InfoTitle>
          <InfoSubtitle>{track.artist}</InfoSubtitle>
        </Info>
        <Item position={"right"}>
          <IconButton
            onClick={() => {
              handleAddSong(track)
            }
            }
            aria-label="add"
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
    </>
  );  
}