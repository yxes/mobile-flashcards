import React, { Component } from 'react'
import { 
  Animated,
  StyleSheet,
  Text,
  TouchableOpacity,
  View 
} from 'react-native'
import { connect } from 'react-redux'
import { Ionicons } from '@expo/vector-icons'
import {
  clearLocalNotification,
  getDailyReminderValue,
  setLocalNotification
} from '../utils/helpers'
import { gray, green, red, white } from '../utils/colors'
import Button from './Button'


class Quiz extends Component {

  state = {
    index: 0,
    question: true,
    text: '',
    stats: {
      correct: 0,
      total: 0
    },
    complete: false,
    error_msg: '',
    notifications: true
  }

  componentWillMount() {
    this.animatedValue = new Animated.Value(0)

    this.aniValue = 0
    this.animatedValue.addListener( ({ value }) => {
      this.aniValue = value
    })

    this.frontInterpolate = this.animatedValue.interpolate({
      inputRange: [0, 180],
      outputRange: ['0deg', '180deg']
    })

    this.backInterpolate = this.animatedValue.interpolate({
      inputRange: [0, 180],
      outputRange: ['180deg', '360deg']
    })

    // Android backfaceVisibility bug:
    // https://github.com/facebook/react-native/pull/15970
    this.backOpacity = this.animatedValue.interpolate({
      inputRange: [89, 90],
      outputRange: [0, 1]
    })
  }

  componentDidMount() {
    const { deck } = this.props.navigation.state.params

    deck.questions.length === 0
     ? this.setState({ complete: true })
     : this.setState({ text: deck.questions[0].question })
  }

  // correct = true || false || undefined
  next = (correct) => {
    const { deck } = this.props.navigation.state.params
    const old_index = this.state.index
    const { complete, question, stats } = this.state

    this.setState({ error_msg: "" })

    if (complete) return

    if (typeof(correct) === "boolean") { // true or false
      this.setState({
        stats: {
          correct: stats.correct + (correct ? 1 : 0),
          total: stats.total + 1
        }
      })
    }

    const index = question ? old_index : (old_index + 1)

    if (index === deck.questions.length) {
      this.setState({ complete: true });
      return
    }

    const text = question 
      ? deck.questions[index].answer 
      : deck.questions[index].question

    this.setState({
      text,
      index,
      question: !question
    })

    if (this.aniValue >= 90) {
      Animated.spring(this.animatedValue,{
        toValue: 0,
        friction: 8,
        tension: 8
      }).start()
    }else{
      Animated.spring(this.animatedValue,{
        toValue: 180,
        friction: 8,
        tension: 8
      }).start()
    }

    // you don't have to complete the quiz to turn off the notification
    if (this.state.notifications) {
      clearLocalNotification()
        .then(setLocalNotification())
        .then(this.setState({ notifications: false }))
    }
  }

  render() {
    const { deck } = this.props.navigation.state.params
    const { complete, error_msg, question, stats, text } = this.state

    const frontAnimatedStyle = {
      transform: [
        { rotateY: this.frontInterpolate }
      ]
    }

    const backAnimatedStyle = {
      opacity: this.backOpacity,
      transform: [
        { rotateY: this.backInterpolate }
      ]
    }

    if (complete) {
      return(
        <View style={styles.container}>
          <Text style={styles.header}>
            Score: {Math.round((stats.correct/stats.total) * 100)}%
          </Text>
          <Button
            buttonStyle={{ backgroundColor: green }}
            textStyle={{ color: white }}
            text="Restart Quiz"
            onPress={() => this.props.navigation.navigate("Quiz",{deck})}
          />
          <Button
            text="Back To Deck"
            onPress={() => this.props.navigation.navigate("Deck",{deck})}
          />
          <Text
            style={{ padding: 20 }} 
            onPress={() => this.props.navigation.navigate("Decks")}>
            <Ionicons name='ios-book' size={15} /> Return to Decks
          </Text>
        </View>
      )
    }

    return (
      <View style={styles.container}>
        <Text style={styles.header}>Quiz</Text>
        <View>
          <TouchableOpacity 
            onPress={question 
              ? this.next 
              : () => { this.setState({
                error_msg: "Please select 'Correct' or 'Incorrect'" }) }
            }>
            <Animated.View style={[styles.flipCard, frontAnimatedStyle]}>
              <Text style={styles.flipText}>
                { text }
              </Text>
            </Animated.View>
            <Animated.View style={[backAnimatedStyle, styles.flipCard, styles.flipCardBack]}>
              <Text style={styles.flipText}>
                { text }
              </Text>
            </Animated.View>
          </TouchableOpacity>
        </View>
        <Text style={{color: red}}>{error_msg !== "" && error_msg }</Text>
        
        { question
          ? <Button
              onPress={this.next}
              text="Show Answer" />
          : <View>
              
              <Button
                buttonStyle={{backgroundColor: green}}
                textStyle={{color: white}}
                text='Correct'
                style={styles.button}
                onPress={() => this.next(true)} />
              <Button
                buttonStyle={{backgroundColor: red}}
                textStyle={{color: white}}
                onPress={() => this.next(false)}
                text='Incorrect' />
            </View>
        }
        <Text style={{ padding: 30 }}>
          { (deck.questions.length - stats.total - 1) }{" "} 
          question{ deck.questions.length - stats.total - 1 !== 1 && "s"}{" "} remaining
        </Text>
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
  flipCard: {
    height: 200,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: green,
    borderRadius: 12,
    backfaceVisibility: 'hidden',
    padding: 20,
    shadowRadius: 3,
    shadowOpacity: 0.8,
    shadowColor: 'rgba(0,0,0,0.24)',
    shadowOffset: {
      width: 0,
      height: 3
    }
  },
  flipCardBack: {
    backgroundColor: gray,
    position: "absolute",
    top: 0
  },
  flipText: {
    width: 200,
    fontSize: 20,
    color: white,
    fontWeight: 'bold'
  }
})

export default connect()(Quiz)