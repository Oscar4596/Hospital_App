import React from 'react'
import { StyleSheet, Platform, Image, Text, View, Button } from 'react-native'
import firebase from 'react-native-firebase'
import Loading from './Loading'

export default class Main extends React.Component {

    state = { currentUser: null, doc: '' }

    static navigationOptions = {
        title: 'Welcome',
      };

    componentDidMount() {
        const { currentUser } = firebase.auth()
        this.setState({ currentUser })
    }
    singOutUser = async () => {
        try {
            await firebase.auth().signOut();
            firebase.auth().onAuthStateChanged(user => this.props.navigation.navigate('Loading'));
        } catch (e) {
            console.log(e);
        }
    }

    readUserData() {
        firebase.database().ref('Citas/').once('value', function (snapshot) {
            console.log(snapshot.val())
        });
    }

    getId () {
        
        firebase.database().ref('Usuarios/').child(this.state.currentUser.uid).once('value')
            .then((snapshot) => {

                var value = snapshot.val()
                
                this.setState({ 
                    doc: value.Documento
                });

                console.log(this.state.doc)

        })
        
    }
    /*export getCitas() {
        var ref = firebase.database.ref("Citas/");
        var query = ref.child(currentUser.uid).once()
    }*/




    render() {
        const { currentUser } = this.state
        const {navigate} = this.props.navigation;
        return (
            <View style={styles.container}>
                <Text>
                    Hi  {currentUser && currentUser.email}!
        </Text>
                <Text></Text>
                <Button title="Consultar Citas" onPress={
                    //user => this.props.navigation.navigate('Consultar')
                    () => this.readUserData()
                } />
                <Text></Text>
                <Button title="Ver Documento" onPress={
                    //user => this.props.navigation.navigate('Consultar')
                    () => this.getId()
                } />
                <Text></Text>
                <Button title="Cerrar Sesion" onPress={() => this.singOutUser()} />
            </View>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})