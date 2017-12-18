import React, {Component} from 'react'
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import { connect } from 'react-redux'
import { black, green, gray, white } from '../utils/colors'
import Button from './Button'
import Quiz from './Quiz'


class Deck extends Component {
  
  startQuiz = (deck) => {
    this.props.navigation.navigate('Quiz', {deck})
  }

  render() {
    const {title} = this.props.navigation.state.params.deck
    const deck = this.props.decks[title]

    const total_questions = 'questions' in deck && deck.questions !== undefined
      ? deck.questions.length
      : 0

    return (
      <View style={styles.container}>
        <Text style={styles.header}>{ deck.title }</Text>
        <Text style={styles.subheader}>
          { total_questions } card{total_questions !== 1 && 's' }
        </Text>
        { total_questions > 0 && // no questions - no quiz
            <Button
              buttonStyle={{ backgroundColor: green }}
              textStyle={{ color: white }}
              onPress={() => this.startQuiz(deck)}
              text='Start a Quiz' />
        }
        <Button
          onPress={() => this.props.navigation.navigate('AddCard', {deck})}
          text='Create New Question' />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    margin: 20
  },
  header: {
    fontSize: 30,
    fontWeight: 'bold'
  },
  subheader: {
    fontSize: 14,
    color: gray,
    marginBottom: 20
  },
  button: {
    alignItems: 'center',
    width: 200,
    padding: 20,
    marginTop: 20,
    borderRadius: 12,
    borderColor: black,
    backgroundColor: white,
  },
  buttonText: {
    fontWeight: 'bold',
    fontSize: 14
  }
})

function mapStateToProps(decks) {
  return { decks }
}

export default connect(mapStateToProps)(Deck)