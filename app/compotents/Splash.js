import React from 'react';
import { View,Image } from 'react-native';

class Splash extends React.Component {
    render() {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor:'#FFF' }}>
                <Image source={require('../img/logo.png')} style={{ height: 270, width: 270 }} />

            </View>
        );
    }
}
export default Splash;