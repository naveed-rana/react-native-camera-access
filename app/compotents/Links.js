import React, { Component } from 'react'
import { View, Text, TouchableOpacity, Clipboard, ToastAndroid, Linking, BackHandler } from 'react-native';
import { Container, Header, Title, Left, Right, Body, Icon, } from 'native-base'

class Links extends Component {
    constructor(props) {
        super(props);
        this.state = {
            res: this.props.navigation.getParam('response', 'NO-LINK'),
        }
        this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    }
    componentWillMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
    }

    handleBackButtonClick() {
        this.props.navigation.navigate('Home');
        return true;
    }
    copylink = async () => {

        let cp = this.state.res[0].label.split(' ')[0]
        await Clipboard.setString('https://www.fentybeauty.com/pro-filtr/soft-matte-longwear-foundation/FB30006.html?dwvar_FB30006_color=FB0' + cp);
        ToastAndroid.show('Copied Link', ToastAndroid.LONG);
    }
    openUrl = () => {
        let link = this.state.res[0].label.split(' ')[0]
        Linking.openURL('https://www.fentybeauty.com/pro-filtr/soft-matte-longwear-foundation/FB30006.html?dwvar_FB30006_color=FB0' + link);
    }
    render() {

        return (
            <Container>
                <Header style={{ backgroundColor: 'rgb(0, 153, 255)' }}
                    androidStatusBarColor="#007acc">
                    <Left style={{ marginLeft: 10 }}>
                        <Icon name='md-arrow-back' style={{ color: '#FFF' }}
                            onPress={() => this.props.navigation.navigate('Home')}
                        />
                    </Left>
                    <Body style={{ marginLeft: -25 }}>
                        <Title>Link</Title>
                    </Body>
                    <Right />
                </Header>
                <View style={{ flex: 1, margin: 10, alignItems: 'center', marginTop: 80 }}>
                    <View style={{ width: '90%', height: 120, marginBottom: 20, justifyContent: 'center', padding: 20, alignItems: 'center', elevation: 15, borderRadius: 5, backgroundColor: 'rgba(0, 153, 255,0.5)' }}>
                        <Text style={{ color: '#000', fontSize: 20 }}>{'https://www.fentybeauty.com/pro-filtr/soft-matte-longwear-foundation/FB30006.html?dwvar_FB30006_color=FB0' + this.state.res[0].label.slice(0, 3)}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <TouchableOpacity
                            style={{
                                backgroundColor: 'rgb(0, 153, 255)',
                                marginBottom: 10, marginTop: 10,
                                height: 40, width: '45 %'

                            }}
                            onPress={() => this.copylink()}

                        >
                            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                <Icon name="ios-copy" style={{ color: '#FFF', marginTop: 3 }} />
                                <Text style={{ color: '#FFF', marginTop: 5, marginLeft: 3, fontWeight: 'bold' }}>Copy</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={{
                                backgroundColor: 'rgb(0, 153, 255)',
                                marginLeft: 3,
                                marginBottom: 10, marginTop: 10, height: 40, width: '45%'
                            }}
                            onPress={() => { this.openUrl() }}

                        >
                            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                <Icon type="Foundation" name="web" style={{ color: '#FFF', marginTop: 3 }} />
                                <Text style={{ color: '#FFF', marginTop: 5, marginLeft: 3, fontWeight: 'bold' }}>Open Link</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity
                        style={{
                            backgroundColor: 'rgb(0, 153, 255)',
                            marginBottom: 10, marginTop: 20, height: 40, width: '90%'
                        }}
                        onPress={() => this.props.navigation.navigate('Home')}

                    >
                        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                            <Icon name="md-photos" style={{ color: '#FFF', marginTop: 3 }} />
                            <Text style={{ color: '#FFF', marginTop: 5, marginLeft: 3, fontWeight: 'bold' }}>Take another photo</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </Container>
        )
    }
}
export default Links;