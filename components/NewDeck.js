import React, { Component } from 'react'
import { connect } from 'react-redux'
import { StyleSheet, Text, TextInput, View } from 'react-native'
import { addDeck } from '../actions'
import { saveDeckTitle } from '../utils/helpers'
import { green, white } from '../utils/colors'
import Button from './Button'


class NewDeck extends Component {
  
  state = {
    title: ''
  }

  addTitle = () => {
    const { title } = this.state

    const deck = { title, questions: []}

    this.props.dispatch(addDeck(deck))
    saveDeckTitle(title)

    this.setState({ title: '' })

    this.props.navigation.navigate('Deck', {deck})
  }

  render() {
    return (
      <View style={style.container}>
        <Text>What is the title of your new deck?</Text>
        <TextInput
          multiline={false}
          autoFocus={false}
          onSubmitEditing={this.addTitle}
          placeholder="Deck Title"
          style={style.input}
          onChangeText={ title => this.setState({title}) }
          value={this.state.title} />
        <Button
          buttonStyle={{ backgroundColor: green }}
          textStyle={{ color: white }}
          onPress={this.addTitle}
          text='Create Deck'
        />
      </View>
    )
  }
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    margin: 30
  },
  input: {
    height: 40,
    width: 200,
    borderColor: green,
    borderWidth: 1,
    padding: 10
  }
})

export default connect()(NewDeck)