import React from 'react';
import {View, Text} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';

function HomeScreen({navigation}) {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <TouchableOpacity onPress={() => navigation.navigate('CallVideo')}>
        <Text>Go to CallVideo Screen</Text>
      </TouchableOpacity>
    </View>
  );
}
export default HomeScreen;
