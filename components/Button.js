import React from 'react'
import { black, green, ltgree, ltgreen, white } from '../utils/colors'
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

export default function Button ({
  text="button", onPress, buttonStyle={}, textStyle={}}) {

  return (
    <TouchableOpacity
      style={[styles.button, buttonStyle]}
      onPress={onPress} >
      <Text style={[styles.buttonText, textStyle]}>{text}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    width: 200,
    padding: 20,
    marginTop: 20,
    borderRadius: 12,
    borderColor: black,
    borderWidth: 1,
    backgroundColor: white,
  },
  buttonText: {
    fontWeight: 'bold',
    fontSize: 16
  }
})