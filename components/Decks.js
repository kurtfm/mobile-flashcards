import React from 'react';
import {
  Text,
  FlatList,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { Badge, Card } from 'react-native-elements';
import { connect } from 'react-redux';
import { getDecks } from '../actions'
import colors from '../utils/colors'

const { lightgreen } = colors

class Decks extends React.Component {


    componentDidMount() {
        this.props.getDecks()
    }

    static navigationOptions = ({
        title: 'Home',
        headerLeft: null
    })

  render() {
    return (
      <ScrollView style={styles.containerStyle}>
        {this.props.decks.length < 1 && (
            <Text>Use 'Add Deck' to add new decks to your collection.</Text>
        )}
        {this.props.decks.map((deck,index) => (
            <TouchableOpacity 
                onPress={()=>(this.props.navigation.navigate(
                    'Deck',{deckId: deck.id,navTitle: deck.title}))}
                key={index}
                >
                <Card title={deck.title}>
                    <Badge containerStyle={{ backgroundColor: lightgreen}}>
                    <Text>
                        {`${deck.questions.length} cards`}
                    </Text>
                    </Badge>
                </Card>
            </TouchableOpacity>
        ))}
      </ScrollView>
    )
  }
}

const styles = {
  containerStyle: {
    flex: 1,
  }
};

function mapStateToProps({decks}){
  return {
      decks: decks !== null && !Object.keys(decks).length ? [] : Object.keys(decks).map(id => {
        return {...decks[id],id}
        })
   }
}
function mapDispatchToProps(dispatch){
    return {
        getDecks: ()=>dispatch(getDecks()),
    }
}

export default connect(mapStateToProps,mapDispatchToProps,)(Decks);

