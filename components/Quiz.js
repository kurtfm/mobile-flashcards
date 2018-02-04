import React from 'react'
import {
  Text,
  View,
  ScrollView,
  StyleSheet,
  Platform,
  Animated,
} from 'react-native'
import { Card, Button } from 'react-native-elements'
import colors from '../utils/colors'
import QuizResults from './QuizResults'

const { green, red, lighttext, bluegrey, lightblue, lightgreen } = colors

class Quiz extends React.Component {
  state={
    questions: this.props.navigation.state.params.questions,
    fadeValue:new Animated.Value(1),
    bounceValue: new Animated.Value(1),
    endPosition:null,
    currentQuestion: this.props.navigation.state.params.questions[0].question,
    currentAnswer: this.props.navigation.state.params.questions[0].answer,
    currentPosition:0,
    endPosition: this.props.navigation.state.params.questions.length - 1,
    cardTitle:'Question:',
    cardText:this.props.navigation.state.params.questions[0].question,
    cardFace: 'front',
    cardButtonText:'Reveal Answer',
    correctCount:0,
    score:0,
    finished: false,
  }

  flipCard(){
    const { cardFace, fadeValue, bounceValue } = this.state
      Animated.timing(fadeValue,{toValue: 0,duration: 1000,}).start()
      this.toggleCard(cardFace)
      Animated.timing(fadeValue,{toValue: 1,duration: 1000,}).start()
      Animated.sequence([
        Animated.timing(bounceValue, { duration: 200, toValue: 1.04}),
        Animated.spring(bounceValue, { toValue: 1, friction: 4})
      ]).start()

  }

  toggleCard(cardFace){
    const { currentQuestion, currentAnswer } = this.state
    const front = cardFace === 'front'
    this.setState({
      cardTitle: front ? 'Answer:' : 'Question:',
      cardText: front ? currentAnswer : currentQuestion,
      cardFace: front ? 'back' : 'front',
      cardButtonText: front ? 'Back to Question' : 'Reveal Answer',
    })
  }

  submitResult(result){
    const { currentPosition, endPosition, questions } = this.state
    this.setState((prevState) => ({
      correctCount: prevState.correctCount + result,
    }),()=>{
      if(endPosition === currentPosition){
        const finalScore = Math.floor(( this.state.correctCount / questions.length ) * 100)
        this.setState({
          finished: true,
          score: finalScore,
        })
      }
      else{
        this.updateCardText()
      }
    })
  }

  updateCardText(){
    const { currentPosition, questions } = this.state
    this.setState(prevState => {
      return {
        currentPosition: prevState.currentPosition + 1,
      }
    },()=>{
      const newPosition = this.state.currentPosition
      this.setState({
        currentQuestion: questions[newPosition].question,
        currentAnswer: questions[newPosition].answer,
        cardText: questions[newPosition].question,
      },()=>{this.toggleCard('back')})
    })
  }

  render() {
    const {
      fadeValue,
      bounceValue,
      cardButtonText,
      cardText,
      cardTitle,
      score,
      finished,
      currentPosition,
      endPosition,
      questions,
    } = this.state
      const id = this.props.navigation.state.params.deckId
      const positionDiff = (endPosition - currentPosition) + 1
      const cardsRemaining = `${positionDiff} card${positionDiff == 1 ? `` : `s`} remaining`
      return (
        <ScrollView style={styles.mainView} backgroundColor={bluegrey} >
        { finished === true && (
          <QuizResults id={id} questions={questions} score={score} {...this.props}/>
        )}
        { finished === false && (
          <View>
            <Animated.View style={[styles.flip,{opacity: fadeValue,transform: [{scale: bounceValue}]}]}>
              <Card title={cardTitle} style={styles.card}>
                <Text style={styles.cardText}>{cardText}</Text>
                <Button title={cardButtonText} onPress={this.flipCard.bind(this)}/>
              </Card>
            </Animated.View>
            <View style={styles.buttonRow}>
              <View>
                <Text style={styles.buttonHeading}>{cardsRemaining}</Text>
              </View>
              <View style={styles.button}>
                <Button
                  title="I was right! 😁"
                  backgroundColor={green}
                  onPress={()=>(this.submitResult(1))}
                />
              </View>
              <View style={styles.button}>
                <Button
                  title="Got it wrong. ☹️"
                  backgroundColor={red}
                  onPress={()=>(this.submitResult(0))}
                />
              </View>
            </View>
          </View>
        )}
      </ScrollView>
      )
  }
}

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
  },
  flip:{
    flex:3,
  },
  card:{
    padding:20,
    borderRadius: Platform.OS === 'ios' ? 16 : 2,
    marginBottom:20,
  },
  cardText:{
    fontSize:30,
    textAlign:'center',
    padding: 20,
  },
  buttonsRow:{
    flex: 1,
  },
  buttonHeading:{
    textAlign:'center',
    color:lighttext,
    padding:20,
    fontSize:20,
  },
  button:{
    marginBottom:10,
    marginTop: 10,
  },
})

export default (Quiz);
