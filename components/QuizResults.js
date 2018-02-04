import React from 'react'
import {
  Text,
  View,
  StyleSheet,
  Platform,
} from 'react-native'
import { Card, Button } from 'react-native-elements'
import colors from '../utils/colors'

const { lightblue, lightgreen } = colors

class QuizResults extends React.Component {

    render(){
        return(
            <View>
            <View style={styles.flip}>
              <Card title="Quiz Results:" style={styles.card}>
                <Text style={styles.cardText}>Your score: {this.props.score}%</Text>
              </Card>
            </View>
            <View style={styles.buttonRow}>
              <View style={styles.button}>
                <Button
                  title="Restart Quiz"
                  backgroundColor={lightgreen}
                  onPress={() => {this.props.navigation.navigate('Quiz',{questions:this.props.questions})}}
                />
              </View>
              <View style={styles.button}>
                <Button
                  title="Back to Deck"
                  backgroundColor={lightblue}
                  onPress={() => {this.props.navigation.navigate('Deck',{deckId:this.props.id})}}
                />
              </View>
            </View>
          </View>
        )
    }
}
const styles = StyleSheet.create({
    card:{
      padding:20,
      borderRadius: Platform.OS === 'ios' ? 16 : 2,
      marginBottom:20,
    },
    flip:{
        flex:3,
      },
    cardText:{
      fontSize:30,
      textAlign:'center',
      padding: 20,
    },
    buttonsRow:{
      flex: 1,
    },
    button:{
      marginBottom:10,
      marginTop: 10,
    },
  })

  export default (QuizResults)