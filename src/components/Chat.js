import React, { useEffect, useRef } from 'react'
import styled from 'styled-components'
import StarBorderOutlinedIcon from '@material-ui/icons/StarBorderOutlined';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import { selectRoomId } from '../features/appSlice.js';
import { useSelector } from 'react-redux';
import ChatInput from './ChatInput.js';
import { useCollection, useDocument } from 'react-firebase-hooks/firestore';
import { db } from '../firebase.js';
import Message from './Message.js';

function Chat() {

  const ChatRef = useRef(null)

  const roomId = useSelector(selectRoomId)

  const [roomDetails] = useDocument(
    roomId && db.collection('rooms').doc(roomId)
  )

  
  
  const [roomMessages , loading] = useCollection(
    roomId && 
      db.collection('rooms')
      .doc(roomId)
      .collection('messages')
      .orderBy('timestamp' , 'asc')
  )

  let roomName = 'select room'
  if(roomDetails !== undefined){
    roomName = roomDetails.data().name
  }

  useEffect(() => {
    ChatRef?.current?.scrollIntoView({
      behavior : 'smooth',
    });
  }, [roomId , loading])
  
  return (
    <ChatContainer>
      {roomDetails && roomMessages && (
        <>
          <Header>
            <HeaderLeft>
              <h4>
                <strong>#{roomName}</strong>
              </h4>
              <StarBorderOutlinedIcon />
            </HeaderLeft>
            <HeaderRight>
              <p> 
                <InfoOutlinedIcon /> Details
              </p>
            </HeaderRight>
          </Header>
          <ChatMessages>
            {roomMessages?.docs.map(doc => {
              const {messages, timestamp, user, userImage} = doc.data()
              return <Message 
                key={doc.id}
                message={messages}
                timestamp={timestamp}
                user={user}
                userImage={userImage}
              />
            })}
            <ChatButton ref={ChatRef} />
          </ChatMessages>

          <ChatInput 
            chatRef = {ChatRef}
            channelName = {roomDetails?.data().name}
            channelId = {roomId}
          />
        </>
      )}
      
    </ChatContainer>
  )
}

export default Chat

const ChatButton = styled.div`
  padding-bottom : 200px;
`

const ChatMessages = styled.div``

const HeaderLeft = styled.div`
  display : flex;
  align-items : center;
  > h4 {
    display: flex;
    text-transform : lowercase;
    margin-right : 10px;
    > .MuiSvgIcon-root {
      margin-left: 10px;
      font-size: 18px;
    }
  }
`

const HeaderRight = styled.div`
  > p {
    display: flex;
    align-items: center;
    font-size: 14px;
    .MuiSvgIcon-root {
      margin-right: 5px !important;
      font-size: 16px;
    }
  }
`

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px;
  border-bottom: 1px solid lightgray;
`

const ChatContainer = styled.div`
  flex: 0.7;
  flex-grow: 1;
  overflow-y: scroll;
  margin-top : 65px;
`