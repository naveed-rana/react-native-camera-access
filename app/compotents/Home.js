import React, { Component } from 'react'
import { View, Text, StyleSheet, ImageBackground } from 'react-native';
import { Container, Header, Title, Button, Left, Right, Body, Icon, } from 'native-base';
import ImagePicker from 'react-native-image-picker';


const options = {
    title: 'Select Option',
    storageOptions: {
        skipBackup: true,
        path: 'images',

    },
};
export default class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            imageSource: null,
            uri: '',
        }
    }
    selectPhotoGallery() {
        ImagePicker.launchImageLibrary(options, (response) => {
            console.log('Response = ', response);
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            } else {
                const source = { uri: response.uri };
                this.setState({
                    imageSource: source,
                    uri: response.uri,
                });
                this.props.navigation.navigate('Upload', { img: source, imgUri: this.state.uri });
            }

        });
    }
    TakePhoto() {
        ImagePicker.launchCamera(options, (response) => {
            console.log('Response = ', response);
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            } else {
                const source = { uri: response.uri }
                this.setState({
                    imageSource: source,
                    uri: response.uri
                });
                this.props.navigation.navigate('Upload', { img: source, imgUri: this.state.uri });
            }

        });
    }

    render() {
        return (
            <Container>
                <Header style={{ backgroundColor: 'rgb(0, 153, 255)' }}
                    androidStatusBarColor="#007acc">
                    <Left>

                    </Left>
                    <Body style={{ marginLeft: -25 }}>
                        <Title>Foundation Findr</Title>
                    </Body>
                    <Right>
                        <Icon name='ios-home' style={{ color: '#FFF' }} />
                    </Right>
                </Header>

                <ImageBackground style={{ flex: 1, }} source={require('../img/bg2.png')}>
                    <View style={styles.container}>
                        <Button block style={{ backgroundColor: 'rgb(0, 153, 255)', marginBottom: 10, }} onPress={this.TakePhoto.bind(this)}>
                            <Icon name="ios-camera" style={{ color: '#FFF' }} />
                            <Text style={{ color: '#FFF', fontWeight: 'bold' }}>Take a photo</Text>
                        </Button>
                        <Button block style={{ backgroundColor: 'rgb(0, 153, 255)', marginBottom: 80 }} onPress={this.selectPhotoGallery.bind(this)}>
                            <Icon name="ios-images" style={{ color: '#FFF' }} />
                            <Text style={{ color: '#FFF', fontWeight: 'bold', }}>Choose gallery</Text>
                        </Button>
                    </View>
                </ImageBackground>
            </Container >
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
})