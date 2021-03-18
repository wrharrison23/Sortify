import React from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import Grid from "@material-ui/core/Grid";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import DeleteIcon from "@material-ui/icons/Delete";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    height: 60,
    width: 400,
    backgroundColor: "#EEFBFB",
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
    height:"100%"
  },
  delete: {
    height: 20,
    width: 20,
  },
  trackName: {
    fontSize: "5rem"
  }
}));

const theme = createMuiTheme({
  typography: {
    h5: {
      fontSize: 17,
    },
    subtitle1: {
      fontSize:12,
    },
    button: {
      fontStyle: "italic",
    },
  },
});

export const SongCard = ( {song} ) => {
const classes = useStyles();


return (
  <Card className={classes.root}>
    <CardMedia component="img" className={classes.cover} src={song.imageUrl} />

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
            {song.name}
          </Typography>
          <Typography
            variant="subtitle1"
            color="textSecondary"
            style={{ backgroundColor: "white" }}
          >
            {song.artist}
          </Typography>
        </ThemeProvider>
      </CardContent>
      <DeleteIcon
        color="disabled"
        className="delete"
        style={{ backgroundColor: "white" }}
      />
    </Grid>
  </Card>
);
}
