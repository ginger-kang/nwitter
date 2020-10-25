import React, { useEffect, useState } from 'react';
import { dbService } from 'fBase';

const Home = () => {
  const [nweet, setNweet] = useState('');
  const [nweets, setNweets] = useState([]);

  useEffect(() => {
    getNweets();
  },[]);

  const getNweets = async () => {
    const dbNweets = await dbService.collection('nweets').get();
    dbNweets.forEach((document) => {
      const nweetObject = {
        ...document.data(),
        id: document.id,
      };
      setNweets(prev => [document.data(), ...prev]);
    });
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    // Create document
    await dbService.collection('nweets').add({
      nweet,
      createdAt: Date.now()
    });
    setNweet('');
  };

  const onChange = (event) => {
    const {target: {value}} = event;
    setNweet(value);
  };

  //console.log(nweets);
  return (
    <div>
      <form onSubmit={onSubmit}>
        <input value={nweet} onChange={onChange} type="text" placeholder="what's on your mind?" maxLength={120} />
        <input type="submit" value="Nweet" />
      </form>
      <div key={nweet.id}>
        {nweets.map(nweet => <div><h4>{nweet.nweet}</h4></div>)}
      </div>
    </div>
  );
};

export default Home;