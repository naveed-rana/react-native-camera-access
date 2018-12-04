import React, { Component } from 'react';
import { View, StatusBar } from 'react-native';
import { createStackNavigator, } from 'react-navigation';
import Home from '../compotents/Home';
import Upload from '../compotents/UploadScreen';
import Links from '../compotents/Links';

const Root = createStackNavigator({

    Home: {
        screen: Home
    },
    Upload: {
        screen: Upload
    },
    Link: {
        screen: Links
    }

},
    {
        initialRouteName: 'Home',
        headerMode: 'none'
    }
);

class RootStack extends Component {
    render() {
        return (
            <View style={{ flex: 1 }}>

                <Root />
            </View>
        );
    }
}
export default RootStack;