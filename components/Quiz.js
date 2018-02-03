import React from 'react'
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  Animated,
} from 'react-native'
import { Card, Button } from 'react-native-elements'

class Quiz extends React.Component {
  state={
    fadeAnswer:new Animated.Value(0),
    fadeQuestion:new Animated.Value(1),
  }

  flipToAnswer(){
    Animated.timing(
      this.state.fadeAnswer,
      {
        toValue: 1,
        duration: 1000,
      }
    ).start()
    Animated.timing(
      this.state.fadeQuestion,
      {
        toValue: 0,
        duration: 1000,
      }
    ).start()
  }
  flipToQuestion(){
    Animated.timing(
      this.state.fadeQuestion,
      {
        toValue: 1,
        duration: 1000,
      }
    ).start()
    Animated.timing(
      this.state.fadeAnswer,
      {
        toValue: 0,
        duration: 1000,
      }
    ).start()
  }
  render() {
    const {fadeAnswer,fadeQuestion} = this.state
    return (
    <View style={styles.mainView}>
      <View style={styles.flip}>
        <Animated.View style={{opacity: fadeQuestion}}>
          <Text style={styles.cardText}>Question: {this.props.navigation.state.params.questions[0].question}</Text>
          <Button title="Show Answer" onPress={this.flipToAnswer.bind(this)}/>
        </Animated.View>
        <Animated.View  style={{opacity: fadeAnswer}}>
          <Text>
            Answer: {this.props.navigation.state.params.questions[0].answer}
          </Text>
          <Button title="Show Question" onPress={this.flipToQuestion.bind(this)}/>
        </Animated.View>
      </View>
      <View style={styles.buttonRow}>
        <View style={styles.button}>
          <Button title="Correct"/>
        </View>
        <View style={styles.button}>
          <Button title="Incorrect"/>
        </View>
      </View>
    </View>
    )
  }
}

const { height, width } = Dimensions.get('window')
const cardHeight = height/2
const cardWidth = width-200

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
  },
  flip:{
    flex:3,
  },
  card:{
    padding:20,
    margin:30,
  },
  cardText:{
    fontSize:50,
  },
  buttonsRow:{
    flex: 1,
  },
  button:{
    marginBottom:10,
  }
})


export default (Quiz);

