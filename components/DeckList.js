import React, { Component } from 'react'
import {
  Animated, 
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View } from 'react-native'
import { connect } from 'react-redux'
import { receiveDecks } from '../actions'
import { getDecks } from '../utils/helpers'
import { gray, green, ltgreen, white } from '../utils/colors'


function DeckTitle ({ style, deck, onPress }) {
  const total_questions = ('questions' in deck && deck.questions !== undefined)
    ? deck.questions.length
    : 0

  return (
    <TouchableOpacity
      style={style}
      onPress={() => onPress(deck)}>
      <Text style={styles.deckHeader}>{ deck.title }</Text>
      <Text style={{ color: ltgreen }}>
        { total_questions } card{ total_questions !== 1 && 's' }
      </Text>
    </TouchableOpacity>
  )
}

class Decks extends Component {
  
  state = {
    opacity: new Animated.Value(0),
    height: new Animated.Value(0)
  }

  componentDidMount() {
    const { dispatch } = this.props

    getDecks()
      .then( decks => dispatch(receiveDecks(decks)) )
      .then(this.openDecks)
  }

  openDecks = () => {
    const { opacity, height } = this.state

    Animated.timing(height, { toValue: 120, duration: 1000 }).start()
    Animated.timing(opacity, { toValue: 1, duration: 1000 }).start()
  }

  submit = (deck) => {
    const { opacity, height } = this.state
    const { navigate } = this.props.navigation

    // fold up our decks
    Animated.timing(opacity, { toValue: 0, duration: 1000 } )
      .start()
    Animated.timing(height, { toValue: 0, duration: 1000 })
      .start(function onComplete() {
        navigate('Deck', { deck })
        Animated.timing(height, { toValue: 120, duration: 1000 }).start()
        Animated.timing(opacity, { toValue: 1, duration: 1000 }).start()
      })
  }

  render () {
    const { decks } = this.props

    const { opacity, height } = this.state

    return (
      <ScrollView 
        contentContainerStyle={styles.contentContainer}>
        { Object.keys(decks).map( title => (
          <Animated.View style={{ opacity, height }} key={title}>
            <DeckTitle
              style={ styles.deck }
              deck={{title, questions: decks[title].questions}}
              onPress={this.submit} />
          </Animated.View>
        )) }
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  contentContainer: {
    padding: 30
  },
  deck: {
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: green,
    margin: 10,
    borderRadius: 18,
    borderWidth: 0.5,
    borderColor: '#d6d7da',
    shadowRadius: 3,
    shadowOpacity: 0.8,
    shadowColor: 'rgba(0,0,0,0.24)',
    shadowOffset: {
      width: 0,
      height: 3
    }
  },
  deckHeader: {
    fontSize: 16,
    fontWeight: 'bold',
    color: white
  }
})

function mapStateToProps(decks) {
  return { decks }
}

export default connect(mapStateToProps)(Decks)