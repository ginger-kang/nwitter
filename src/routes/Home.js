import React, { useEffect, useState } from 'react';
import { v4 as uuidv4 } from "uuid";
import { dbService, storageService } from 'fBase';
import Nweet from 'components/Nweet';

const Home = ({ userObj }) => {
  const [nweet, setNweet] = useState('');
  const [nweets, setNweets] = useState([]);
  const [attachment, setAttachment] = useState();

  useEffect(() => {
    dbService.collection('nweets').onSnapshot((snapshot) => {
      const nweetArray = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      //console.log(nweetArray);
      setNweets(nweetArray);
    });
  },[]);

  const onSubmit = async (event) => {
    event.preventDefault();
    let attachmentUrl = "";
    if (attachment !== "") {
      const fileRef = storageService.ref().child(`${userObj.uid}/${uuidv4()}`);
      const response = await fileRef.putString(attachment, "data_url");
      attachmentUrl = await response.ref.getDownloadURL();
    } 
    const nweetObj = {
      text: nweet,
      createdAt: Date.now(),
      creatorId: userObj.uid,
      attachmentUrl
    }
    // Create document
    await dbService.collection('nweets').add(nweetObj);
    setNweet('');
    setAttachment('');
  };

  const onChange = (event) => {
    const {target: {value}} = event;
    setNweet(value);
  };
  
  const onFileChange = (event) => {
    const { target: {files} } = event;
    const file = files[0]; 
    const reader = new FileReader();
    reader.onloadend = (finishedEvent) => {
      const { currentTarget: { result }} = finishedEvent;
      setAttachment(result);
    }
    reader.readAsDataURL(file); 
  }

  const onClearAttachment = () => {
    setAttachment(null);
  }
  //console.log(nweets);
  return (
    <div>
      <form onSubmit={onSubmit}>
        <input value={nweet} onChange={onChange} type="text" placeholder="what's on your mind?" maxLength={120} />
        <input type="file" accept="image/*" onChange={onFileChange}/>
        <input type="submit" value="Nweet" />
        {attachment && (
          <div>
            <img src={attachment} alt="attachment" width="50px" height="50px" />
            <button onClick={onClearAttachment}>업로드 취소</button>
          </div>
        )}
      </form> 
      <div>
        {nweets.map((nweet) => (
          <Nweet key={nweet.id} nweetObj={nweet} isOwner={nweet.creatorId === userObj.uid} />
        ))}
      </div>
    </div>
  );
};

export default Home;