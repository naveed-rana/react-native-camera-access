import React, { Component } from 'react';
import { View, PermissionsAndroid, StatusBar } from 'react-native';
import Splash from './app/compotents/Splash';
import Root from './app/config/Root';
export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentScreen: 'Splash'
    }
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({ currentScreen: 'App' })
    }, 3000)
    this.requestPermission();
  }
  async requestPermission() {
    let per = [];
    per.push(PermissionsAndroid.PERMISSIONS.CAMERA);
    per.push(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE);
    try {
      const granted = await PermissionsAndroid.requestMultiple(per)
        .then((res) => {
          console.log("Result" + res);

        }).catch(err => console.log(err));

    } catch (err) {
      console.warn(err)
    }
  }
  render() {
    const { currentScreen } = this.state;
    return (

      <View style={{ flex: 1 }}>
        <StatusBar backgroundColor="#007acc" barStyle="light-content" />
        {currentScreen === 'Splash' ? <Splash /> : <Root />}
      </View>
    );
  }
}

