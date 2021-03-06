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
import { resetData } from './utils/api'
import { setLocalNotification,clearLocalNotification } from './utils/helpers'


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
      title: "Home",
      headerTintColor: white,
      headerStyle: {
        backgroundColor: indigo,
      },
      titleStyle: {
        textAlign:'center',
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
      title: "Add Deck",
      headerTintColor: white,
      headerStyle: {
        backgroundColor: indigo
      }
    }
  },
  AddQuestion: {
    screen: AddQuestion,
    navigationOptions: {
      title: "Add Question",
      headerTintColor: white,
      headerStyle: {
        backgroundColor: indigo
      }
    }
  },
  Quiz: {
    screen: Quiz,
    navigationOptions: {
      title: "Quiz",
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
    //for testing purposes if you need to...
    //resetData()
    //uncomment and save a couple times

    setLocalNotification()
    //for testing purposes if you need to...
    //clearLocalNotification()
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
