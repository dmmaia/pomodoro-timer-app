/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';

import Timer from './src/components/Timer';

function App() {
  return (
    <>
      <SafeAreaView styles={styles.content}>
        <Timer />
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  content: {},
});

export default App;
