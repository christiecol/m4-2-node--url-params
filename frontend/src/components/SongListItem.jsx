import React from "react";
import Styled from "styled-components";

const SongListItem = (props) => {
  const { song, rank, artist, streams, publicationDate } = props;

  return (
    <li>
      <Wrapper>
        <Rank>
          <p className="number">#{rank}</p>{" "}
          <p className="streams">({streams} streams)</p>
        </Rank>
        <SongTitle>
          <p className="title">{song}</p>
          <p className="artist">by {artist}</p>
        </SongTitle>
        <PubContainer>
          <PubDate>publication Date: {publicationDate}</PubDate>
        </PubContainer>
      </Wrapper>
    </li>
  );
};

const Wrapper = Styled.div`
display: flex;
  justify-content: space-between;
  border-bottom: 2px solid lightgray;
  padding: 15px;
  margin: 15px;
  `;

const Rank = Styled.div`
  & .number { 
      font-size: 4rem;
    }
    & .streams {
        font-size: 1rem;
        opacity: 0.7;
    }
    `;

const SongTitle = Styled.div`
    margin-left: 30px;
    width: 60%;

    & .title {
        font-size: 1.7rem;
        font-weight: bold;
    }
    & .artist {
        font-size: 1.5rem;
        font-style: italic;
    }
    `;

const PubContainer = Styled.div`
    display: flex;
    align-content: flex-end;
    `;

const PubDate = Styled.p`
    margin-left: 40px;
    align-self: flex-end;
    opacity: 0.7;
    `;

export default SongListItem;
