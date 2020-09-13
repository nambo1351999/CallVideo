/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  TouchableOpacity,
} from 'react-native';
import Phone from './src/image/Phone.svg';
import Mic from './src/image/Mic.svg';
import Exit from './src/image/Exit.svg';
import Camera from './src/image/Camera.svg';
import {apiKey, sessionId, token} from './src/config';
import {OTSession, OTPublisher, OTSubscriber} from 'opentok-react-native';


const App = () => {
  const [isConnected, setIsConnected] = React.useState(false);
  const [publishAudio, setPublishAudio] = React.useState(true);
  const [publishVideo, setPublishVideo] = React.useState(true);
  const [cameraPosition, setCameraPosition] = React.useState('front');
  const cameraCall = () => {
    if(cameraPosition == 'front'){
      setCameraPosition('back')
    }else{
      setCameraPosition('front')
    }

  }
  const videoCall = () => {
    setPublishVideo(publishVideo => !publishVideo);
  }
  const audioCall = () => {
    setPublishAudio(publishAudio => !publishAudio);
  }
  const sessionEventHandlers = {
    streamCreated: event => {
      console.log('Stream created!1', event);
    },
    streamDestroyed: event => {
      console.log('Stream destroyed!', event);
    },
    sessionConnected: event => {
      console.log('sessionConnected', event);
    },
    connectionCreated: () =>{
      setIsConnected(true)
    },
    connectionDestroyed: () => {
      setIsConnected(false)
    }
  }
  return (
    <OTSession
      apiKey={apiKey}
      sessionId={sessionId}
      token={token}
      eventHandlers={sessionEventHandlers}
      style={styles.container}>
      <OTPublisher style={styles.publisher} properties={{publishAudio:publishAudio, publishVideo:publishVideo,cameraPosition: cameraPosition }}/>
      <OTSubscriber style={styles.subscriber} />
      <TouchableOpacity style={styles.iconCamera} onPress={()=>cameraCall()}>
        <Camera fill={'white'} style={styles.icon}/>
      </TouchableOpacity>
      {isConnected == true ? (
        <View style={styles.content}>
          <TouchableOpacity onPress={() =>videoCall()}>
            <Phone fill={'black'} style={styles.icon} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() =>audioCall()}>
            <Mic fill={'black'} style={styles.icon} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Exit fill={'black'} style={styles.icon} />
          </TouchableOpacity>
        </View>
      ):null}
    </OTSession>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  publisher: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  subscriber: {
    position: 'absolute',
    width: 150,
    height: 200,
    top: 0,
    left: 0,
  },
  content: {
    flexDirection: 'row',
    height: 60,
    width: '100%',
    backgroundColor: 'white',
    position: 'absolute',
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  icon: {
    width: 40,
    height: 40,
  },
  iconCamera: {
    position: 'absolute',
    top:10,
    right:10
  }
});

export default App;
