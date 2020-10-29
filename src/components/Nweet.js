import React, { useState } from 'react';
import { dbService } from 'fBase';

const Nweet = ({ nweetObj, isOwner }) => {
  const [editing, setEditing] = useState(false);
  const [newNweet, setNewNweet] = useState(nweetObj.text);
  
  const onDeleteClick = async () => {
    const ok = window.confirm('정말로 삭제하시겠습니까?');
    if (ok) { 
      await dbService.doc(`nweets/${nweetObj.id}`).delete();
    }
  }

  const toggleEditing = () => {
    setEditing((prev) => !prev);
  }

  const onSubmit = async (event) => {
    event.preventDefault();
    await dbService.doc(`nweets/${nweetObj.id}`).update({
      text: newNweet,
    });
    setEditing(false);
  }

  const onChange = (event) => {
    const { target: {value }} = event;
    setNewNweet(value)
  }
  
  return (
    <div>
      {editing ? (
          <>
            <form onSubmit={onSubmit}>
              <input type='text' placeholder='edit nweet' value={newNweet} required onChange={onChange} />
              <input type='submit' value='update nweet' />
            </form>
            <button onClick={toggleEditing}>취소</button>
          </>
        ) : (
          <>
            <h4>{nweetObj.text}</h4>
            {nweetObj.attachmentUrl && (
              <img src={nweetObj.attachmentUrl} alt="attachment" width="50px" height="50px" />
            )}
            {isOwner && (
              <>
                <button onClick={onDeleteClick}>Delete Nweet</button>
                <button onClick={toggleEditing}>Edit Nweet</button>
              </>
            )}
          </>
        )
      }
    </div>
  );
}

export default Nweet;