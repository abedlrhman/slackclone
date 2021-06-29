import { Button } from '@material-ui/core'
import React, { useState } from 'react'
import styled from 'styled-components'
import { auth, db } from '../firebase.js';
import firebase from 'firebase'
import { useAuthState } from 'react-firebase-hooks/auth';

function ChatInput({channelId, channelName, chatRef}) {

 const [state, setstate] = useState('')
 const [user] = useAuthState(auth)

  const sendMessage = e => {
    e.preventDefault();

    if(!channelId){
      return false
    }
    db.collection("rooms").doc(channelId).collection("messages").add({
      messages : state,
      timestamp : firebase.firestore.FieldValue.serverTimestamp(),
      user : user.displayName,
      userImage : user.photoURL,
    });
    chatRef?.current?.scrollIntoView({
      behavior : 'smooth',
    });

    setstate('')
  }
  let messaging = `message #${channelName}`
  if(channelName === undefined) {
    messaging = 'message some one'
  }
  return (
    <ChatInputContainer>
      <form>
        <input placeholder={messaging} onChange={e => setstate(e.target.value)} value={state}/>
        <Button hidden type='submit' onClick={sendMessage}>SEND</Button>
      </form>
    </ChatInputContainer>
  )
}

export default ChatInput


const ChatInputContainer = styled.div`
  border-radius: 20px;

  > form {
    position: relative;
    display : flex;
    justify-content: center;
    >input{
      position: fixed;
      bottom: 30px;
      width: 60%;
      border: 1px solid gray;
      border-radius: 3px;
      padding: 20px;
      outline: none;
    }
    > button {
      display : none !important
    }
  }
`