import React, { Component } from 'react'
import { connect } from 'react-redux'
import { StyleSheet, Text, TextInput, View } from 'react-native'
import { addCard } from '../actions'
import { addCardToDeck } from '../utils/helpers'
import { gray, green, white } from '../utils/colors'
import Button from './Button'


class AddCard extends Component {
  
  state = {
    question: '',
    answer: '',
    error_msg: ''
  }

  addCard = () => {
    const { deck } = this.props.navigation.state.params
    const { question, answer } = this.state

    const card = { question, answer }
  
    this.props.dispatch(addCard(deck.title, card))

    addCardToDeck(deck, card)

    this.setState({
      question: '',
      answer: '',
      error_msg: ''
    })
  }

  render () {
    const { title } = this.props.navigation.state.params.deck
    const deck = this.props.decks[title]

    const { question, answer, error_msg } = this.state

    const ready = question !== "" && answer !== "" && error_msg === ""

    return (
      <View style={styles.container}>
        <Text style={styles.header}>Populate { title }</Text>
        <Text>question</Text>
        <TextInput
          multiline={false}
          autoFocus={true}
          placeholder="Question"
          style={styles.input}
          onChangeText={ question => this.setState({question}) }
          value={this.state.question} />
        <Text>answer</Text>
        <TextInput
          multiline={false}
          autoFocus={true}
          placeholder="Answer"
          style={styles.input}
          onChangeText={ answer => this.setState({answer}) }
          value={this.state.answer} />
        <Button
          buttonStyle={{backgroundColor: ready ? green : gray }}
          textStyle={{color: white}}
          text="Add Card"
          onPress={ready ? this.addCard : () => {} } />
        <Text>
          { deck.questions.length }{" "}
          question{deck.questions.length !== 1 && "s"}
        </Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center'
  },
  header: {
    padding: 20,
    fontSize: 30,
    fontWeight: 'bold'
  },
  input: {
    height: 40,
    width: 300,
    borderColor: green,
    borderWidth: 1,
    padding: 10
  }

})

function mapStateToProps(decks) {
  return { decks }
}

export default connect(mapStateToProps)(AddCard)