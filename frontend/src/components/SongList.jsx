import React from "react";
import SongListItem from "./SongListItem";

const SongList = (props) => {
  const { songs } = props;
  const allSongs = songs;
  return (
    <ul>
      {allSongs.map((el) => {
        return (
          <SongListItem
            song={el.title}
            rank={el.rank}
            artist={el.artist}
            streams={el.streams}
            publicationDate={el.publicationDate}
            key={el.rank}
          />
        );
      })}
    </ul>
  );
};

export default SongList;
