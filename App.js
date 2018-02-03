import React from 'react'
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { StyleSheet, Text, View } from 'react-native'
import colors from './utils/colors'
import { TabNavigator, StackNavigator } from 'react-navigation';
import { FontAwesome, Ionicons, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import reducer from './reducers'
import Decks from './components/Decks'
import AddDeck from './components/AddDeck'
import Deck from './components/Deck'
import AddQuestion from './components/AddQuestion'
import Quiz from './components/Quiz'
import { setupData } from './utils/api'


const { white, indigo } = colors

const Tabs = TabNavigator({
  Decks: {
    screen: Decks,
    navigationOptions: {
      tabBarLabel: 'All Decks',
      tabBarIcon: ({ tintColor }) => <MaterialCommunityIcons name="cards" size={30} color={tintColor} />
    }
  },
  AddDeck: {
    screen: AddDeck,
    navigationOptions: {
      tabBarLabel: 'Add Deck',
      tabBarIcon: ({ tintColor }) => <MaterialIcons name="note-add" size={30} color={tintColor} />
    }
  }
});

const MainNavigator =  StackNavigator({
  Home: {
    screen: Tabs,
    navigationOptions: {
      title: "All Decks",
      headerTintColor: white,
      headerStyle: {
        backgroundColor: indigo
      }
    }
  },
  Deck: {
    screen: Deck,
    navigationOptions: {
      title: "Deck",
      headerTintColor: white,
      headerStyle: {
        backgroundColor: indigo
      }
    }
  },
  AddDeck: {
    screen: AddDeck,
    navigationOptions: {
      headerTintColor: white,
      headerStyle: {
        backgroundColor: indigo
      }
    }
  },
  AddQuestion: {
    screen: AddQuestion,
    navigationOptions: {
      headerTintColor: white,
      headerStyle: {
        backgroundColor: indigo
      }
    }
  },
  Quiz: {
    screen: Quiz,
    navigationOptions: {
      headerTintColor: white,
      headerStyle: {
        backgroundColor: indigo
      }
    }
  }
});

const store = createStore(reducer, {}, applyMiddleware(thunk))

export default class App extends React.Component {
  componentDidMount() {
    //setupData()
  }
  render() {
    return (
      <Provider store={store}>
        <View  style={{ flex: 1 }}>
          <MainNavigator />
        </View>
      </Provider>
    )
  }
}
