import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import IconAw from 'react-native-vector-icons/FontAwesome';

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
      } else {
        setMinutes(25);
        setZeroForMinutes('');
      }
      setSeconds(0);

      setTimeout(() => {
        setRest(rest === true ? false : true);
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
  }

  return (
    <View style={styles.mainView}>
      <View style={styles.boxTimer}>
        <Text style={styles.minutesField}>
          {zeroforMinutes}
          {minutes}
        </Text>
        <Text style={styles.secondsField}>
          {zeroforSeconds}
          {seconds}
        </Text>
      </View>

      <View style={styles.boxButton}>
        <TouchableOpacity
          style={styles.pauseButton}
          onPress={() => setStatus(false)}>
          <Icon name="pausecircle" size={70} color="orange" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.stopButton}
          onPress={() => handleStop()}>
          <IconAw name="stop" size={70} color="red" />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.startButton}
          onPress={() => setStatus(true)}>
          <Icon name="play" size={70} color="green" />
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
  startButton: {
    marginLeft: 50,
  },
  pauseButton: {
    margin: 0,
  },
  stopButton: {
    marginLeft: 50,
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
});
