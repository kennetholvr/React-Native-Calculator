import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import NumberButton from './components/numberButton.js'

const buttons = [
  ['Clear', 'Del'],
  [7 ,8 ,9, '%'],
  [4 ,5 ,6, '*'],
  [1 ,2 ,3, '-'],
  [0 , '.', '=', '+'],

]

export default function App() {
  
  const renderButtons = () => {
    let layouts = buttons.map((buttonRows, index) => {
      let rowItem = buttonRows.map((buttonItems, buttonIndex) => {
        return <NumberButton 
        value={buttonItems}
        handleOnPress={() => {}}
        key={'btn-' + buttonIndex }/>
      })
      return <View style={styles.inputRow} key={'row-' + index}>{rowItem}</View>
    })
    return layouts
  };

  return (
    <View style={styles.container}>
      <View style={styles.resultContainer}>
        <Text style={styles.resultText}>0</Text>
      </View>
      <View style={styles.buttonContainer}>
            {renderButtons()}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  resultContainer: {
    flex: 2,
    justifyContent: 'center',
    backgroundColor: '#1E1240'
  },
  buttonContainer: {
    flex: 8,
    backgroundColor: '#3D0075'
  },
  resultText: {
    color: 'white',
    fontSize: 80,
    fontWeight: 'bold',
    padding: 20,
    textAlign: 'right'
  },
  inputRow:{
    flex: 1,
    flexDirection: 'row'
  }
});
