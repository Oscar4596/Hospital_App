import React from 'react'
import { StyleSheet, Platform, Image, Text, View } from 'react-native'
import { SwitchNavigator } from 'react-navigation'
import { createStackNavigator, createSwitchNavigator, createAppContainer } from 'react-navigation';

// import the different screens
import Loading from './application/Loading'
import SignUp from './application/SignUp'
import Login from './application/Login'
import Main from './application/Main'
import Consultar from './application/ConsultarCitas'
import NewCita from './application/NewCita'

// create our app's navigation stack

export default createAppContainer(createSwitchNavigator(
  {
    Loading,
    SignUp,
    Login,
    Main,
    Consultar,
    NewCita
  },
  {
    initialRouteName: 'Loading',
  }))