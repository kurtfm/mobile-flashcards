import React from 'react';
import {
  Text,
  View,
  StyleSheet,
} from 'react-native';
import {Card, Button, Header} from 'react-native-elements'
import { connect } from 'react-redux';
import { getDeck, deleteDeck } from '../actions'
import colors from '../utils/colors'
import { HeaderBackButton } from 'react-navigation'

const { lightgreen, bluegrey, red, indigo, white } = colors

class Deck extends React.Component {

  static navigationOptions = ({ navigate, navigation }) => ({
      headerLeft:<HeaderBackButton
        title="All Decks"
        onPress={()=>{ navigation.navigate('Home')}}
        tintColor={white}
        backgroundColor={indigo} />
  })
  componentDidMount() {
    this.props.getDeck(this.props.navigation.state.params.deckId)
  }

  deleteItem(id){
    this.props.deleteDeck(this.props.navigation.state.params.deckId)
    this.props.navigation.navigate('Home')
  }

  render() {
    const { title, questions, id } = this.props.deck
    const cardCount =  typeof questions !== 'undefined' ? questions.length : 0 
    const cardEnding = cardCount > 1 || cardCount === 0 ? 's' : ''
    return (
      <View style={styles.mainView}>
          <Card title={title}>
            <View>
              <Text style={styles.cardSummary}>
                {`${cardCount} card${cardEnding}`}
              </Text>
            </View>
            <View>
            <Button
              icon={{name: 'add-circle'}}
              backgroundColor={bluegrey}
              buttonStyle={styles.buttonStyle}
              title='Add Card'
              onPress={() => {this.props.navigation.navigate('AddQuestion',
                {navTitle: title,title: title, deckId: id})}
              }
            />
          </View>
          <View>
            <Button
              icon={{name: 'play-arrow'}}
              backgroundColor={lightgreen}
              buttonStyle={[styles.buttonStyle, { marginTop: 10 }]}
              title='Start Quiz'
              onPress={() => {this.props.navigation.navigate('Quiz',
                {navTitle: title,questions: questions })}
              }
            />
          </View>
        </Card>
        <View>
          <Button
            title="Delete Deck"
            buttonStyle={[styles.buttonStyle, { marginTop: 50 }]}
            backgroundColor={red}
            onPress={() => this.deleteItem(id)}
          />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  mainView:{
      flex: 1,
      backgroundColor: bluegrey,
  },
  cardSummary: {
    textAlign: 'center',
    marginBottom: 10,
  },
  buttonStyle: {
    borderRadius: 0,
    marginLeft: 0,
    marginRight: 0,
    marginBottom: 0,
  },
  mainView: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center'
  },
})

function mapStateToProps({deck}){
  return {deck}
}
function mapDispatchToProps(dispatch){
  return {
    getDeck: (id) => (dispatch(getDeck(id))),
    deleteDeck: (id) => (dispatch(deleteDeck(id)))
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(Deck)

