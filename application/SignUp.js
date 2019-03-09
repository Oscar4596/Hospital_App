import React from 'react'
import { StyleSheet, Text, TextInput, View, Button, ScrollView } from 'react-native'
import firebase from 'react-native-firebase'

export default class SignUp extends React.Component {
  state = { email: '', password: '', errorMessage: null, Nombres: '', Apellidos: '', Documento: '' }

  //usuario = {  }

  handleSignUp = () => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then(() => {
        firebase.auth().onAuthStateChanged(
          (user) => {
            if (user) {
              var usrRef = firebase.database().ref('Usuarios/' + user.uid);
              usrRef.set({
                Nombres: this.state.Nombres,
                Apellidos: this.state.Apellidos,
                Documento: this.state.Documento,
                email: this.state.email
              });
            }
          })

        this.props.navigation.navigate('Main')
      })
      .catch(error => this.setState({ errorMessage: error.message }))
  }

  render() {
    return (
      <ScrollView>
      <View style={styles.container}>
        <Text>Resgistrarse</Text>
        <Text></Text>
        {this.state.errorMessage &&
          <Text style={{ color: 'red' }}>
            {this.state.errorMessage}
          </Text>}
        <Text></Text>
        <TextInput
          placeholder="Email"
          autoCapitalize="none"
          style={styles.textInput}
          onChangeText={email => this.setState({ email })}
          value={this.state.email}
        />
        <Text></Text>
        <TextInput
          secureTextEntry
          placeholder="Constraseña"
          autoCapitalize="none"
          style={styles.textInput}
          onChangeText={password => this.setState({ password })}
          value={this.state.password}
        />
        <Text></Text>
        <TextInput
          placeholder="Nombres"
          autoCapitalize="none"
          style={styles.textInput}
          onChangeText={Nombres => this.setState({ Nombres })}
          value={this.state.Nombres}
        />
        <Text></Text>
        <TextInput
          placeholder="Apellidos"
          autoCapitalize="none"
          style={styles.textInput}
          onChangeText={Apellidos => this.setState({ Apellidos })}
          value={this.state.Apellidos}
        />
        <Text></Text>

        <TextInput
          placeholder="Documento"
          autoCapitalize="none"
          style={styles.textInput}
          onChangeText={Documento => this.setState({ Documento })}
          value={this.state.Documento}
        />
        <Text></Text>
        <Button title="Registrarse" onPress={this.handleSignUp} />
        <Text></Text>
        <Button
          title="¿Ya tienes cuenta? Inicia sesión"
          onPress={() => this.props.navigation.navigate('Login')}
        />
        <Text></Text>

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
  },
  textInput: {
    height: 40,
    width: '90%',
    borderColor: 'gray',
    borderWidth: 1,
    marginTop: 8
  }
})