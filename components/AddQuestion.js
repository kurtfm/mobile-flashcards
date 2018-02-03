import React from 'react';
import {
  Text,
  View,
} from 'react-native';
import { connect } from 'react-redux';


class AddQuestion extends React.Component {

  componentDidMount() {
    
  }

  componentDidUpdate() {
    
  }


  render() {
    return (
      <View style={styles.containerStyle}>
        <Text>Add Question</Text>
      </View>
    );
  }
}

const styles = {
  containerStyle: {
    flex: 1,
    alignSelf: 'stretch'
  }
};

const mapStateToProps = state => {

  return { };
};

export default connect(mapStateToProps)(AddQuestion);

