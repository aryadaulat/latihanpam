import React, {Component} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import Router from './router';

export default class App extends Component {
  render() {
    return (
      <NavigationContainer>
        <Router />
      </NavigationContainer>
    );
  }
}
