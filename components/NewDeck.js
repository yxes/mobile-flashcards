import React, {Component} from 'react'
import { connect } from 'react-redux'
import {StyleSheet, Text, TextInput, View} from 'react-native'
import { black, white } from '../utils/colors'
import { addDeck } from '../actions'
import { saveDeckTitle } from '../utils/helpers'
import Button from './Button'

class NewDeck extends Component {
  state = {
    title: ''
  }

  addTitle = () => {
    const { title } = this.state
    
    this.props.dispatch(addDeck({title, questions: []}))

    this.setState({ title: '' })

    // go Home

    saveDeckTitle(title)
  }

  render() {
    return (
      <View style={style.container}>
        <Text>What is the title of your new deck?</Text>
        <TextInput
          multiline={false}
          autoFocus={true}
          onSubmitEditing={this.addTitle}
          placeholder="Deck Title"
          style={style.input}
          onChangeText={ title => this.setState({title}) }
          value={this.state.title} />
        <Button
          buttonStyle={{ backgroundColor: black }}
          textStyle={{ color: white }}
          onPress={this.addTitle}
          text='Submit'
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
    borderColor: black,
    borderWidth: 1,
    padding: 10
  }
})

export default connect()(NewDeck)