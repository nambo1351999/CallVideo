/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {StyleSheet, View, TouchableOpacity, Alert, Text} from 'react-native';
import Phone from './image/Phone.svg';
import Mic from './image/Mic.svg';
import Photo from './image/Photo.svg';
import Mute from './image/Mute.svg';
import Hide from './image/Hide.svg';
import Camera from './image/Camera.svg';
import {apiKey, sessionId, token} from './config';
import {OTSession, OTPublisher, OTSubscriber} from 'opentok-react-native';

const CallVideo = ({navigation}) => {
  const [isConnected, setIsConnected] = React.useState(false);
  const [publishAudio, setPublishAudio] = React.useState(false);
  const [publishVideo, setPublishVideo] = React.useState(true);
  const [cameraPosition, setCameraPosition] = React.useState('front');
  const [seconds, setSeconds] = React.useState(0);
  const [isActive, setIsActive] = React.useState(true);
  
  const otSession = React.useRef(null);
  const disconnectCall = () => {
    console.log(
      'otSession.current.sessionDisconnected',
      otSession,
    );
  };
  React.useEffect(() => {
    let interval = null;
    if (isActive) {
      interval = setInterval(() => {
        setSeconds((seconds) => seconds + 1);
      }, 3000);
    } else if (!isActive && seconds !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, seconds]);
  const cameraCall = () => {
    if (cameraPosition == 'front') {
      setCameraPosition('back');
    } else {
      setCameraPosition('front');
    }
  };
  const videoCall = () => {
    setPublishVideo((publishVideo) => !publishVideo);
  };
  const audioCall = () => {
    setPublishAudio((publishAudio) => !publishAudio);
  };
  const sessionEventHandlers = {
     streamCreated: event => {
      console.log('Stream created!1', event);
    },
     streamDestroyed: (event) => {
      console.log('Stream destroyed!', event);
    },
     sessionConnected: (event) => {
      console.log('sessionConnected', event);
    },
     connectionCreated: (event) => {
      console.log('connectionCreated', event);
      setIsConnected(true);
      setIsActive(isActive);
    },
     sessionDisconnected: (event) => {
      console.log('sessionDisconnected', event);
    },
     connectionDestroyed: () => {
      setIsConnected(false);
      setSeconds(0);
      setIsActive(false);
      return Alert.alert(
        'Thông báo',
        'Cuộc gọi đã kết thúc',
        [{text: 'OK', onPress: () => navigation.navigate('HomeScreen')}],
        {cancelable: false},
      );
    },
     sessionDisconnected: (event) => {
      console.log('sessionDisconnected', event);
    },
  };
  const formatTime = () => {
    const getSeconds = `0${seconds % 60}`.slice(-2);
    const minutes = `${Math.floor(seconds / 60)}`;
    const getMinutes = `0${minutes % 60}`.slice(-2);
    const getHours = `0${Math.floor(seconds / 3600)}`.slice(-2);
    return `${getHours} : ${getMinutes} : ${getSeconds}`;
  };
  return (
    <OTSession
    apiKey={apiKey}
    sessionId={sessionId}
    token={token}
    ref={otSession}
    eventHandlers={sessionEventHandlers}
      style={styles.container}>
      <OTPublisher
        style={styles.publisher}
        properties={{
          publishAudio: publishAudio,
          publishVideo: publishVideo,
          cameraPosition: cameraPosition,
        }}
      />
      <OTSubscriber style={styles.subscriber} />
      {isConnected == true ? (
        <View style={styles.content}>
          <TouchableOpacity onPress={() => videoCall()} style={styles.box1}>
            {publishVideo ? (
              <Photo fill={'white'} style={styles.icon} />
            ) : (
              <Hide fill={'white'} style={styles.icon} />
            )}
          </TouchableOpacity>
          <TouchableOpacity onPress={() => audioCall()} style={styles.box1}>
            {publishAudio ? (
              <Mic fill={'white'} style={styles.icon} />
            ) : (
              <Mute fill={'white'} style={styles.icon} />
            )}
          </TouchableOpacity>
          <TouchableOpacity style={styles.box1} onPress={() => cameraCall()}>
            <Camera fill={'white'} style={styles.icon} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.box} onPress={()=>disconnectCall()}>
            <Phone fill={'white'} style={styles.icon} />
          </TouchableOpacity>
        </View>
      ) : null}
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
    width: 130,
    height: 180,
    top: 20,
    left: 20,
  },
  content: {
    flexDirection: 'row',
    height: 80,
    width: '90%',
    backgroundColor: 'rgba(255,255,255, 0.9)',
    position: 'absolute',
    bottom: 10,
    alignSelf:'center',
    borderRadius:20,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  icon: {
    width: 25,
    height: 25,
  },
  box: {
    width: 50,
    height: 50,
    backgroundColor: 'red',
    borderRadius: 50 / 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  box1: {
    width: 50,
    height: 50,
    backgroundColor: 'black',
    borderRadius: 50 / 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconCamera: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
});

export default CallVideo;
