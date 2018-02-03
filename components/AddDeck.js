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
import { addDeckByTitle } from '../utils/api'
import { doesTitleExistInDecks } from '../utils/helpers'
import { getDecks } from '../actions'
import colors from '../utils/colors'

const { white } = colors

class AddDeck extends React.Component {
  state={
    title: '',
    titleError: null,
  }

  handleAdd = () =>{
    if( doesTitleExistInDecks(this.props.decks,this.state.title) ) {
      this.setState({titleError: `This title was used before!`})
    }
    else if(this.state.title === ''){
      this.setState({titleError:`A title is required.`})
    }
    else if( this.state.titleError === null ){
      addDeckByTitle(this.state.title)
      .then(id=>{
        this.props.getDecks()
        this.setState({title:'',titleError:null})
        return this.props.navigation.navigate('Deck',{deckId: id,navTitle: this.state.title})
      })
    }
  }

  titleValidation = (title)=>{
    //TODO: implement real validation library
    this.setState({title}, ()=>{
        if( this.state.title.match(/^[0-9a-zA-Z \-\.\_]+$/) || this.state.titleError === null ){
          if(this.state.title.startsWith(' ')){
            this.setState({titleError:`Titles can't start with spaces.`})
          }
          else{
            this.setState({titleError: null})
          }
        }
        else{
          this.setState({titleError: `This title will not work.`})
        }
    })
  }

  render() {
    return (
      <View style={styles.mainView}>
        <View style={styles.form}>
          <FormLabel>Title</FormLabel>
          <FormInput
            onChangeText={(title)=>{this.titleValidation(title)}}
            shake={this.state.titleError}
            value={this.state.title}
          />
          { this.state.titleError !== null && (
          <FormValidationMessage>
            {this.state.titleError}
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
  form:{
    padding:20,
  }
})

function mapStateToProps({decks}){
  return {decks}
}
function mapDispatchToProps(dispatch){
  return {
    getDecks: () => (dispatch(getDecks()))
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(AddDeck)

