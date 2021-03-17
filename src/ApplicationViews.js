import React from "react";
import { Route } from "react-router-dom";
import { SongList } from "./Spotify/SongList";
import { SongProvider } from "./Providers/SpotifyProvider";

import { App } from "./App";

export const ApplicationViews = () => {
  return (
    <>
      <Route exact path="/">
        <App />
      </Route>

      {/* <SongProvider>
        <Route path="/home">
          <SongList />
        </Route>
      </SongProvider> */}
    </>
  );
};
