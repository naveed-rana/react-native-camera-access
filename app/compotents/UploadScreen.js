import React from 'react';
import { View, Text, Image, StyleSheet, ActivityIndicator, Modal } from 'react-native';
import { Container, Header, Title, Button, Left, Right, Body, Icon, Content } from 'native-base';
import axios from 'axios';
class Upload extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            imageSource: null,
            uri: '',
            loading: false,
            res: []

        }

    }

    componentDidMount() {
        let uri = this.props.navigation.getParam('imgUri', 'NO-URI');
        this.setState({
            uri: uri
        })
    }

    // Upload Images
    uploadImage() {
        this.setState({ loading: true });
        const data = new FormData();
        data.append('image', {
            uri: this.state.uri,
            type: 'image/jpeg',
            name: `${new Date().getTime()}.jpg`,
        });
        console.log("axios");
        

        axios.post('http://a8144bfdceaec11e89eb20a7e22e6984-1894741278.us-east-1.elb.amazonaws.com/predict', data, {
            headers: {

                'Content-Type': 'multipart/form-data',
            },
        })
            .then(res => {
                // console.log("The Response", res);
                this.setState({ loading: false, res: res.data.predictions });
                this.props.navigation.navigate('Link', { "response": this.state.res });
            }).catch(err => {
                // console.log("ERROR", err)
                alert("Something went wrong...")
                this.setState({ loading: false });
            });

    }
    render() {
        const { navigation } = this.props;
        const myimg = navigation.getParam('img', 'NO-URI');
        return (
            <Container>
                <Header style={{ backgroundColor: 'rgb(0, 153, 255)' }}
                    androidStatusBarColor="#007acc">
                    <Left style={{ marginLeft: 10 }}>
                        <Icon name='md-arrow-back' style={{ color: '#FFF' }}
                            onPress={() => this.props.navigation.goBack()}
                        />
                    </Left>
                    <Body style={{ marginLeft: -25 }}>
                        <Title>Upload Image</Title>
                    </Body>
                    <Right />
                </Header>
                <Content>
                    <View style={{ margin: 10, marginTop: 80 }}>
                        <View style={{ height: 250, flex: 1, position: 'relative', justifyContent: 'center', alignItems: 'center' }}>
                            <Image source={myimg} style={styles.img}
                                resizeMode="cover"
                            />
                        </View>
                        <View style={{ marginLeft: 25, marginRight: 25 }}>
                            <Button block style={{ backgroundColor: 'rgb(0, 153, 255)', marginBottom: 10, marginTop: 10 }}
                                onPress={this.uploadImage.bind(this)}
                            >
                                <Icon name="ios-cloud-upload" style={{ color: '#FFF' }} />
                                <Text style={{ color: '#FFF', fontWeight: 'bold' }}>Upload</Text>
                            </Button>
                        </View>
                        {
                            (this.state.loading === true) && (

                                <Modal
                                    animationType='none'
                                    transparent={true}
                                    visible={this.state.loading}
                                    onRequestClose={() => {
                                        alert('Modal Close...')
                                    }}
                                >
                                    <ActivityIndicator
                                        animating={true}
                                        style={styles.indicator}
                                        size='large'
                                    />
                                </Modal>
                            )
                        }
                    </View>
                </Content>

            </Container>
        )
    }
}
export default Upload;

const styles = StyleSheet.create({
    img: {
        position: 'absolute',
        height: 230,
        width: 280
    },
    indicator: {
        flex: 1,
        marginBottom: 85,
        justifyContent: 'center',
        alignItems: 'center',
        height: 280
    }
})