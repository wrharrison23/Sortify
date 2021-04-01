import {SpotifyContext} from "../Providers/SpotifyProvider"
import React, {useContext, useEffect, useState} from "react"
import InputBase from "@material-ui/core/InputBase";
import SearchIcon from "@material-ui/icons/Search";
import {RecCard} from "./RecCard"

  export const SearchBar = (playlist) => {
    const { results, setResults, searchTracks } = useContext(SpotifyContext);
    const [searchQ, setSearchQ] = useState("");
    
    return (
      <>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            searchTracks(searchQ, playlist);
            console.log(playlist)
          }}
        >
          <div color="white">
            <SearchIcon style={{color: "white"}} />

            <InputBase
            style={{color: "white"}}
              color="secondary"
              placeholder="Search for a track..."
              inputProps={{ "aria-label": "search" }}
              name="q"
              // value={searchQ}
              onChange={(e) => setSearchQ(e.target.value)}
            />
          </div>
        </form>
      </>
    );
  }
