import React from 'react'
import { Text, StyleSheet, View, ScrollView, FlatList } from 'react-native'

import firebase from 'react-native-firebase'

export default class ConsultarCitas extends React.Component {

    state = {Citas: 'sdfghjk'}

    
    constructor(props) {
        super(props);
        var dbref = firebase.database().ref('/Citas');
        dbref.once('value').then(snapshot => {
            this.setState({Citas: snapshot.val()})
        })

    } 

    render() {
        return (

            <ScrollView>
                <View>
                <Text value =  {this.state.Citas} >
                    </Text>
                </View>
            </ScrollView>
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