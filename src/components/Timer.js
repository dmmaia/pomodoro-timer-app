import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

const Timer = () => {
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(2);
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
        alert('Rest Time!!!');
      } else {
        setMinutes(25);
        setZeroForMinutes('');
        alert('Lets do it!!!');
      }
      setSeconds(0);

      setTimeout(() => {
        setRest(rest === true ? false : true);
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [minutes, seconds, status]);

  function handleStop() {
    setStatus(false);
    setMinutes(25);
    setSeconds(0);
    setRest(true);
    setZeroForSeconds('0');
  }

  return (
    <View style={styles.mainView}>
      <View style={styles.boxButton}>
        <TouchableOpacity
          style={styles.pauseButton}
          onPress={() => setStatus(false)}>
          <Text style={styles.buttonText}>Pause</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.stopButton}
          onPress={() => handleStop()}>
          <Text style={styles.buttonText}>Stop</Text>
        </TouchableOpacity>
      </View>

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
          style={styles.startButton}
          onPress={() => setStatus(true)}>
          <Text style={styles.buttonText}>Start</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Timer;

const styles = StyleSheet.create({
  mainView: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    height: 100 + '%',
    backgroundColor: 'black',
    paddingTop: 150,
  },
  boxButton: {
    marginTop: 50,
    flexDirection: 'column',
  },
  boxTimer: {
    flexDirection: 'column',
  },
  startButton: {
    padding: 10,
    backgroundColor: 'green',
    marginTop: 36,
    borderRadius: 5,
  },
  pauseButton: {
    padding: 5,
    backgroundColor: 'orange',
    marginTop: 15,
    borderRadius: 5,
  },
  stopButton: {
    padding: 5,
    backgroundColor: 'red',
    marginTop: 15,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 21,
  },
  minutesField: {
    color: 'white',
    fontSize: 75,
  },
  secondsField: {
    color: 'white',
    fontSize: 55,
    marginLeft: 10,
  },
});
