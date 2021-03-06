import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Vibration,
  StatusBar,
} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import IconAw from 'react-native-vector-icons/FontAwesome';
import IconEnt from 'react-native-vector-icons/Entypo';
import NotificationSounds, {
  playSampleSound,
  stopSampleSound,
} from 'react-native-notification-sounds';

const Timer = () => {
  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);
  const [status, setStatus] = useState(false);
  const [rest, setRest] = useState(true);

  const [zeroforSeconds, setZeroForSeconds] = useState('0');
  const [zeroforMinutes, setZeroForMinutes] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      if (status) {
        setZeroForSeconds(seconds <= 10 ? '0' : '');
        if (seconds === 0) {
          setZeroForSeconds('');
        }
        setSeconds(seconds === 0 ? 59 : seconds - 1);

        setZeroForMinutes(minutes < 10 ? '0' : '');
        setMinutes(seconds === 0 ? minutes - 1 : minutes);
      }
    }, 1000);

    if (minutes === 0 && seconds === 0) {
      if (rest) {
        setMinutes(5);
        setZeroForMinutes('0');
        NotificationSounds.getNotifications('notification').then(
          (soundsList) => {
            playSampleSound(soundsList[1]);
          },
        );
      } else {
        setMinutes(25);
        setZeroForMinutes('');
        NotificationSounds.getNotifications('notification').then(
          (soundsList) => {
            playSampleSound(soundsList[2]);
          },
        );
      }
      setSeconds(0);
      Vibration.vibrate();
      setTimeout(() => {
        setRest(rest === true ? false : true);
        Vibration.cancel();
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [minutes, rest, seconds, status]);

  function handleStop() {
    setStatus(false);
    setMinutes(25);
    setSeconds(0);
    setRest(true);
    setZeroForSeconds('0');
    setZeroForMinutes('');
  }

  return (
    <View style={styles.mainView}>
      <StatusBar
        barStyle="light-content"
        hidden={false}
        backgroundColor="#000000"
        translucent={true}
      />
      <View style={styles.boxTimer}>
        <Text style={styles.minutesField}>
          {zeroforMinutes}
          {minutes}
        </Text>
        <Text style={styles.equalSinal}>:</Text>
        <Text style={styles.secondsField}>
          {zeroforSeconds}
          {seconds}
        </Text>
      </View>

      <View style={styles.boxButton}>
        <TouchableOpacity
          style={styles.pauseButton}
          onPress={() => setStatus(false)}>
          <Icon
            name={status === true ? 'pause' : 'pausecircle'}
            size={70}
            color="white"
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.stopButton}
          onPress={() => handleStop()}>
          <IconAw name="stop" size={70} color="#660000" />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.startButton}
          onPress={() => setStatus(true)}>
          {status === true ? (
            <Icon name="play" size={70} color="white" />
          ) : (
            <IconEnt name="controller-play" size={70} color="white" />
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Timer;

const styles = StyleSheet.create({
  mainView: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    height: 100 + '%',
    backgroundColor: 'black',

    paddingTop: 150,
  },
  boxButton: {
    marginTop: 50,
    flexDirection: 'row',
  },
  boxTimer: {
    flexDirection: 'row',
  },
  equalSinal: {
    color: 'white',
    fontSize: 80,
    marginLeft: 10,
  },
  startButton: {
    marginLeft: 30,
  },
  pauseButton: {
    marginLeft: 0,
  },
  stopButton: {
    marginLeft: 41,
    marginTop: 200,
  },
  buttonText: {
    color: 'white',
    fontSize: 21,
  },
  minutesField: {
    color: 'white',
    fontSize: 90,
  },
  secondsField: {
    color: 'white',
    fontSize: 75,
    marginLeft: 10,
    marginTop: 10,
  },
  statusBar: {
    backgroundColor: 'black',
  },
});
