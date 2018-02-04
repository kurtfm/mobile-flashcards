import React from 'react';
import {
  Text,
  FlatList,
  View,
  StyleSheet,
} from 'react-native';
import { List, ListItem } from 'react-native-elements';
import { connect } from 'react-redux';
import { getDecks } from '../actions'
import colors from '../utils/colors'

const { bluegrey, lighttext } = colors

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
      <View style={styles.mainView}>
        {this.props.decks.length < 1 && (
            <Text style={styles.noDecks}>Use 'Add Deck' to add new decks to your collection.</Text>
        )}
        {this.props.decks.length > 0 && (
        <List
            containerStyle={[styles.listContainer]}
        >
        <FlatList
            data={this.props.decks}
            renderItem={({ item }) => (
                <ListItem
                    onPress={()=>(this.props.navigation.navigate(
                        'Deck',{deckId: item.id}))}
                    title={item.title}
                    hideChevron={true}
                    titleStyle={styles.listTitle}
                    subtitle={`${item.questions.length} card${item.questions.length > 1 || item.questions.length === 0 ? `s`:``}`}
                    subtitleStyle={styles.listTitle}
                    wrapperStyle={styles.listWrapper}
                    leftIcon={{name:'cards-variant',type:'material-community'}}
                />
            )}
            keyExtractor={item => item.id}
        />
    </List>
        )}
      </View>
    )
  }
}

const styles = StyleSheet.create({
    mainView:{
        flex: 1,
        backgroundColor: bluegrey,
    },
    noDecks:{
        textAlign:'center',
        fontSize: 20,
        padding: 30,
        color: lighttext,
    },
    listContainer:{
        margin: 10,
    },
    listTitle: {
        textAlign: 'center',
    },
    listWrapper: {
        padding: 20,
    },
})

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
