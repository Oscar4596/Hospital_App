import React from 'react'
import { StyleSheet, Platform, Image, Text, TextInput, View, Button } from 'react-native'
import firebase from 'react-native-firebase'
import Loading from './Loading'
import { Dropdown } from 'react-native-material-dropdown';

export default class NewCita extends React.Component {

    state = { currentUser: null, esp: ''}

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

    getId () {
        
        firebase.database().ref('Usuarios/').child(this.state.currentUser.uid).once('value')
            .then((snapshot) => {

                var value = snapshot.val()
                
                this.setState({ 
                    doc: value.Documento
                });

                //console.log(this.state.doc)

        })
        
    }

    getCita () {
        this.getId();
        firebase.database().ref('Citas/'+this.state.doc).once('value')
        .then((snapshot) => {

            var value = snapshot.val()
            
            this.setState({ 
                consul: value.Consultorio,
                fecha: value.FechaHora,
                prof: value.Profesional

            });

            console.log(this.state.consul+" - "+this.state.fecha+" - "+ this.state.prof)

    })
    }

    /*export getCitas() {
        var ref = firebase.database.ref("Citas/");
        var query = ref.child(currentUser.uid).once()
    }*/

    onChangeText(text) {
        ['esp']
          .map((name) => ({ name, ref: this[name] }))
          .filter(({ ref }) => ref && ref.isFocused())
          .forEach(({ name, ref }) => {
            this.setState({ [name]: text });
          });
  }


    render() {
        const { currentUser } = this.state
        const {navigate} = this.props.navigation;
        let data = [{
            value: 'Odontologia',
          }, {
            value: 'Medicina General',
          }, {
            value: 'Ortopedia',
          }];
        return (
            <View style={styles.container}>
                <Text>
                    Hi  {currentUser && currentUser.email}!
                </Text>
                <Text></Text>
                <Dropdown 
                    label='Especialidad'
                    data={data}
                    onChangeText={this.setState({esp})}
                />
                <Button title="Ver Estado" onPress={
                    //user => this.props.navigation.navigate('Consultar')
                    () => this.getEstado()
                }/>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        borderRadius: 4
    },
    textInput: {
        height: 40,
        width: '90%',
        borderColor: 'gray',
        borderWidth: 1,
        marginTop: 8
      }
})