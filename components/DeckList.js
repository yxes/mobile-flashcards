import React, { Component } from 'react'
import { 
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View } from 'react-native'
import { connect } from 'react-redux'
import { getDecks } from '../utils/helpers'
import { receiveDecks } from '../actions'
import { white, gray, green, ltgreen } from '../utils/colors'


function DeckTitle ({ style, deck, onPress }) {
  console.log("this deck: ", deck)
  total_questions = 0
  if ('questions' in deck && deck.questions !== undefined) {
    total_questions = deck.questions.length
  }

  return (
    <TouchableOpacity
      key={ deck.title }
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
  componentDidMount() {
    const { dispatch } = this.props

    getDecks()
      .then( decks => dispatch(receiveDecks(decks)) )
  }

  submit = (deck) => {
    this.props.navigation.navigate('Deck', {deck})
  }

  render () {
    const { decks } = this.props

    return (
      <ScrollView 
        contentContainerStyle={styles.contentContainer}>
        { Object.keys(decks).map( title => (
          <DeckTitle
        
            style={ styles.deck }
            key={title}
            deck={{title, questions: decks[title].questions}}
            onPress={this.submit} />
        )) }
        <Text></Text>
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