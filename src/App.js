import React, { useState, useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import Dropdown from 'react-dropdown';
import parse from 'html-react-parser';

import { formatSeasons } from './utils/formatSeasons';
import { fetchShow } from './api/fetchShow';

import Episodes from './components/Episodes';
import EpisodePage from './components/EpisodePage';
import './styles.css';

export default function App() {
  const [show, setShow] = useState(null);
  const [seasons, setSeasons] = useState([]);
  const [episodeList, setEpisodeList] = useState([]);
  const [selectedSeason, setSelectedSeason] = useState('');
  const episodes = seasons[selectedSeason] || [];

  useEffect(() => {
    fetchShow().then(data => {
      setShow(data);
      setSeasons(formatSeasons(data._embedded.episodes));
      setEpisodeList(data._embedded.episodes);
    });
  }, []);

  const handleSelect = e => {
    setSelectedSeason(e.value);
  };

  if (!show) {
    return <h2>Fetching data...</h2>;
  }

  return (
    <div className='App'>
      <Switch>
        <Route path='/s:season/e:episode'>
          <EpisodePage episodeList={episodeList} />
        </Route>
        <Route path='/'>
          <img
            className='poster-img'
            src={show.image.original}
            alt={show.name}
          />
          <h1>{show.name}</h1>
          {parse(show.summary)}
          <Dropdown
            options={Object.keys(seasons)}
            onChange={handleSelect}
            value={selectedSeason || 'Select a season'}
            placeholder='Select an option'
          />
          <Episodes episodes={episodes} />
        </Route>
      </Switch>
    </div>
  );
}
