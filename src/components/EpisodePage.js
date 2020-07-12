import React from 'react';
import { useParams } from 'react-router-dom';
import parse from 'html-react-parser';

const EpisodePage = ({ episodeList }) => {
  const params = useParams();
  const episode = episodeList.find(
    item =>
      item.season === Number(params.season) &&
      item.number === Number(params.episode)
  );

  console.log(episodeList);

  return (
    <div className='episode episode-solo'>
      {episode.image && (
        <img
          className='episode-image episode-image-solo'
          src={episode.image.medium}
          alt={episode.name}
        />
      )}
      <div className='episode-info'>
        <p className='episode-number'>
          Season {episode.season}, Episode {episode.number}
        </p>
        <h3>{episode.name}</h3>
        {episode.summary && parse(episode.summary)}
        <div className='flex-spacer' />
        <p className='episode-runtime'>{episode.runtime} minutes</p>
      </div>
    </div>
  );
};

export default EpisodePage;
