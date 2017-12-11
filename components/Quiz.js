import React, {Component} from 'react'
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import {connect} from 'react-redux'
import {black, gray, green, red, white} from '../utils/colors'
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
    complete: false
  }

  componentDidMount() {
    const {deck} = this.props.navigation.state.params

    deck.questions.length === 0
     ? this.setState({ complete: true })
     : this.setState({ text: deck.questions[0].question })

  }

  // correct = true || false || undefined
  next = (correct) => {
    const {deck} = this.props.navigation.state.params
    const old_index = this.state.index
    const {question, complete} = this.state

    if (complete) return

    if (typeof(correct) === "boolean") { // true or false
      this.setState({
        stats: {
          correct: this.state.stats.correct + (correct ? 1 : 0),
          total: this.state.stats.total + 1
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
  }

  render() {
    const { deck } = this.props.navigation.state.params
    const { complete, question, stats, text } = this.state

    if (complete) {
      return(
        <View style={styles.container}>
          <Text>Score: {Math.round((stats.correct/stats.total) * 100)}%</Text>
        </View>
      )
    }

    return (
      <View style={styles.container}>
        <Text style={styles.header}>Quiz</Text>
        <Text style={styles.subheader}>{ text }</Text>
        { question
          ? <Button
              onPress={this.next}
              text='answer' />
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
          { deck.questions.length - stats.total - 1 } cards left
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
  subheader: {
    fontSize: 14,
    color: gray,
    marginBottom: 20
  }
})

export default connect()(Quiz)