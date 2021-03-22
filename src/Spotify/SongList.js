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
    width: "100%"
  },
}));

export const SongList = () => {
  const {
    tracks,
    features,
    getFeatures,
    getTopTracks,
    setFeatures,
    savePlaylist
  } = useContext(SpotifyContext);

  const [danceIdArray, setDanceIdArray] = useState([])
  const [danceArray, setDanceArray] = useState([]);
  const [feelGoodIdArray, setFeelGoodIdArray] = useState([]);
  const [feelGoodArray, setFeelGoodArray] = useState([]);
  const [intenseIdArray, setIntenseIdArray] = useState([]);
  const [intenseArray, setIntenseArray] = useState([]);
  const [chillIdArray, setChillIdArray] = useState([]);
  const [chillArray, setChillArray] = useState([]);
  const [sadIdArray, setSadIdArray] = useState([]);
  const [sadArray, setSadArray] = useState([]);

  const classes = useStyles()

  useEffect(() => {
    getTopTracks().then(buildMoodLists)
  }, []);

  const buildMoodLists = () => {
    getFeatures(tracks.trackArray)
    .then(() => {

    
       if (features.audio_features) {
         let danceIds = [];
         let feelGoodIds = [];
         let sadIds = [];
         let intenseIds = [];
         let chillIds = [];
         features.audio_features.filter((feature) => {
           if (feature.danceability > 0.6) {
             danceIds.push(feature.id);
           } if (feature.valence > .6 && feature.energy > .3){
             feelGoodIds.push(feature.id)
           } if (feature.energy > .75){
             intenseIds.push(feature.id)
           } if(feature.energy > .3 && feature.valence > .25){
             chillIds.push(feature.id)
           } if (feature.valence < .3 && feature.energy < .6){
             sadIds.push(feature.id)
           }
         })
         setDanceIdArray(danceIds);
         setFeelGoodIdArray(feelGoodIds);
         setIntenseIdArray(intenseIds);
         setChillIdArray(chillIds);
         setSadIdArray(sadIds);
         createPlaylist();
       }  
}
    )}
    
  const createPlaylist = () => {
    let danceList = []
    let feelGoodList = []
    let intenseList = []
    let sadList = []
    let chillList = []

    danceIdArray.map((featureId) => {
      let relatedTrack = tracks.trackArray.find((track) => 
        track.id === featureId
      )
      danceList.push({
        name: relatedTrack.name,
        artist: relatedTrack.artist,
        imageUrl:relatedTrack.imageUrl,
        id: relatedTrack.id,
        playlist: "dance"
      })
    })
    setDanceArray(danceList);

    feelGoodIdArray.map((featureId) => {
      let relatedTrack = tracks.trackArray.find(
        (track) => track.id === featureId
      );
      feelGoodList.push({
        name: relatedTrack.name,
        artist: relatedTrack.artist,
        imageUrl: relatedTrack.imageUrl,
        id: relatedTrack.id,
        playlist: "feelGood",
      });
    });
    setFeelGoodArray(feelGoodList);

    intenseIdArray.map((featureId) => {
      let relatedTrack = tracks.trackArray.find(
        (track) => track.id === featureId
      );
      intenseList.push({
        name: relatedTrack.name,
        artist: relatedTrack.artist,
        imageUrl: relatedTrack.imageUrl,
        id: relatedTrack.id,
        playlist: "intense",
      });
    });
    setIntenseArray(intenseList);

    sadIdArray.map((featureId) => {
      let relatedTrack = tracks.trackArray.find(
        (track) => track.id === featureId
      );
      sadList.push({
        name: relatedTrack.name,
        artist: relatedTrack.artist,
        imageUrl: relatedTrack.imageUrl,
        id: relatedTrack.id,
        playlist: "sad",
      });
    });
    setSadArray(sadList);

    chillIdArray.map((featureId) => {
      let relatedTrack = tracks.trackArray.find(
        (track) => track.id === featureId
      );
      chillList.push({
        name: relatedTrack.name,
        artist: relatedTrack.artist,
        imageUrl: relatedTrack.imageUrl,
        id: relatedTrack.id,
        playlist: "chill",
      });
    });
    setChillArray(chillList);
  }

  const handleSavePlaylist = (playlistName, description, songArray) => {
    let uriArray = songArray.map((song) => {
     return `spotify:track:${song.id}`
    })
    savePlaylist(playlistName, description, uriArray);
    
    console.log("Saved");
  }

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
                onClick={() => handleSavePlaylist("Sortify - Dance", "Songs to dance to - created by Sortify", danceArray)}
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
          </Grid>
          <Grid item xs={5}>
            <h3>Feel-good</h3>
            <div>
              {intenseArray?.map((track) => {
                return <SongCard key={track.id} song={track} />;
              })}
            </div>
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
      </Grid>
    </>
  );
};
 

