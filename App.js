import React from 'react';
import { Platform, StatusBar, StyleSheet, Text, View } from 'react-native';
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from './reducers'
import { TabNavigator, StackNavigator } from 'react-navigation'
import { Ionicons } from '@expo/vector-icons'
import { Constants } from 'expo'
import { green, dkgreen, ltgreen, white } from './utils/colors'
import { setLocalNotification } from './utils/helpers'
import DeckList from './components/DeckList'
import NewDeck from './components/NewDeck'
import AddCard from './components/AddCard'
import Deck from './components/Deck'
import Quiz from './components/Quiz'

function UdaciStatusBar ({ backgroundColor, ...props }) {
  return (
    <View style={{backgroundColor, height: Constants.statusBarHeight }}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  )
}

const Tabs = TabNavigator({
  Decks: {
    screen: DeckList,
    navigationOptions: {
      tabBarLabel: 'Decks',
      tabBarIcon: ({tintColor}) => 
        <Ionicons name='ios-book' size={30} color={tintColor} />
    }
  },
  NewDeck: {
    screen: NewDeck,
    navigationOptions: {
      tabBarLabel: 'New Deck',
      tabBarIcon: ({tintColor}) =>
        <Ionicons name='ios-bookmarks' size={30} color={tintColor} />
    }
  } 
}, {
    navigationOptions: {
      header: null
    },
    tabBarOptions: {
      inactiveTintColor: Platform.OS === 'ios' ? dkgreen : ltgreen,
      activeTintColor: white,
      style: {
        backgroundColor: Platform.OS === 'ios' ? ltgreen : dkgreen,
        shadowColor: 'rgba(0, 0, 0, 0.24)',
        shadowOffset: {
          width: 0,
          height: 3
        },
        shadowRadius: 6,
        shadowOpacity: 1
      }
    }
  }
)

const MainNavigator = StackNavigator({
  Home: {
    screen: Tabs
  },
  Deck: {
    screen: Deck,
    navigationOptions: {
      title: 'udacicards',
      headerTintColor: white,
      headerStyle: {
        backgroundColor: green
      }
    }
  },
  AddCard: {
    screen: AddCard,
    navigationOptions: {
      title: 'udacicards: AddCard',
      headerTintColor: white,
      headerStyle: {
        backgroundColor: green
      }
    }
  },
  Quiz: {
    screen: Quiz,
    navigationOptions: {
      title: 'deck',
      headerTintColor: white,
      headerStyle: {
        backgroundColor: green
      }
    }
  }
})

export default class App extends React.Component {
  
  componentDidMount() {
    setLocalNotification()
  }

  render() {
    return (
      <Provider store={createStore(reducer)}>
        <View style={{ flex: 1 }}>
          <UdaciStatusBar backgroundColor={dkgreen} barStyle='light-content' />
          <MainNavigator />
        </View>
      </Provider>
    );
  }
}
