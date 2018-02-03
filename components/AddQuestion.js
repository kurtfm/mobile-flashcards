import React from 'react';
import {
  Text,
  View,
  KeyboardAvoidingView,
  Keyboard,
  NavigationActions,
  StyleSheet,
} from 'react-native';
import {
  Button,
  FormLabel,
  FormInput,
  FormValidationMessage
} from 'react-native-elements'
import { connect } from 'react-redux';
import { addCardToDeck } from '../utils/api'
import { doesQuestionExistInQuestions } from '../utils/helpers'
import { getDeck } from '../actions'
import colors from '../utils/colors'

const { white, grey, bluegrey } = colors

class AddQuestion extends React.Component {
  state={
    question: '',
    questionError: null,
    answer:'',
    answerError: null,
  }

  handleAdd = () =>{
    const id = this.props.id
    if( doesQuestionExistInQuestions(this.props.questions,this.state.question) ) {
      this.setState({questionError: `This question was used before!`})
    }
    else if(this.state.question === ''){
      this.setState({questionError:`A question is required.`})
    }
    else if(this.state.answer === ''){
      this.setState({answerError:`A question is required.`})
    }
    else if( this.state.questionError === null && this.state.answerError === null ){
      addCardToDeck(id,{
          question:this.state.question,
          answer:this.state.answer})
      .then(()=>{
        this.props.getDeck(id)
        this.setState({question:'',
          questionError:null,
          answer:'',
          answerError:null})
        return this.props.navigation.navigate('Deck',
          {deckId: id,navTitle: this.props.title})
      })
    }
  }

  questionValidation = (question)=>{
    //TODO: implement real validation library
    this.setState({question}, ()=>{
        if( this.state.question.match(/^[0-9a-zA-Z \-\.\_\?]+$/) || this.state.questionError === null ){
          if(this.state.question.startsWith(' ')){
            this.setState({questionError:`Questions can't start with spaces.`})
          }
          else{
            this.setState({questionError: null})
          }
        }
        else{
          this.setState({questionError: `This question will not work.`})
        }
    })
  }

  answerValidation = (answer)=>{
    //TODO: implement real validation library
    this.setState({answer}, ()=>{
        if( this.state.answer.match(/^[0-9a-zA-Z \-\.\_\?]+$/) || this.state.answerError === null ){
          if(this.state.answer.startsWith(' ')){
            this.setState({answerError:`Answers can't start with spaces.`})
          }
          else{
            this.setState({answerError: null})
          }
        }
        else{
          this.setState({answerError: `This answer will not work.`})
        }
    })
  }

  render() {
    return (
      <View style={styles.mainView}  backgroundColor={bluegrey} >
        <View style={styles.form}>
          <Text style={styles.subtitle}>Create a question and use either a correct or incorrect answer to make it interesting.</Text>
          <FormLabel>Question:</FormLabel>
          <FormInput
            onChangeText={(question)=>{this.questionValidation(question)}}
            shake={this.state.questionError}
            value={this.state.question}
          />
          { this.state.questionError !== null && (
          <FormValidationMessage>
            {this.state.questionError}
          </FormValidationMessage>
          )}
          <FormLabel>Answer:</FormLabel>
          <FormInput
            onChangeText={(answer)=>{this.answerValidation(answer)}}
            shake={this.state.answerError}
            value={this.state.answer}
          />
          { this.state.answerError !== null && (
          <FormValidationMessage>
            {this.state.answerError}
          </FormValidationMessage>
          )}
        </View>
        <View>
          <Button onPress={this.handleAdd} title='Submit'/>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
  },
  subtitle:{
    fontSize:20,
    color:grey,
    marginBottom: 20,
  },
  form:{
    padding:20,
  }
})

function mapStateToProps({deck}){
  return {
    questions:deck.questions,
    id:deck.id,
    title:deck.title,
  }
}
function mapDispatchToProps(dispatch){
  return {
    getDeck: (id) => (dispatch(getDeck(id)))
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(AddQuestion)

