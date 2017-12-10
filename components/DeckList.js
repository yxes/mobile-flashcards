import React, { Component } from 'react'
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { getDecks } from '../utils/helpers'
import { receiveDecks } from '../actions'
import { white, gray } from '../utils/colors'


function TitleCard ({ style, card, onPress }) {
  return (
    <TouchableOpacity
      key={ card.title }
      style={style}
      onPress={onPress}>
      <Text style={styles.cardHeader}>{ card.title }</Text>
      <Text style={{ color: gray }}>{ card.questions.length } cards</Text>
    </TouchableOpacity>
  )
}

class Decks extends Component {
  componentDidMount() {
    const { dispatch } = this.props

    getDecks()
      .then( decks => dispatch(receiveDecks(decks)) )
  }

  submit = () => {
    console.log("pressed")
  }

  render () {
    const { decks } = this.props

    return (
      <View style={styles.container}>
        { Object.keys(decks).map( title => (
          <TitleCard
            style={ styles.card }
            key={title}
            card={{title, questions: decks[title].questions}}
            onPress={this.submit} />
        )) }
        <Text></Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
   // backgroundColor: gray,
    padding: 30
  },
  card: {
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: white,
    margin: 10,
    borderRadius: 4,
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
  cardHeader: {
    fontSize: 16,
    fontWeight: 'bold'
  }
})

function mapStateToProps(decks) {
  return { decks }
}

export default connect(mapStateToProps)(Decks)