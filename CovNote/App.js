import React from 'react';
import { StyleSheet, Text, View, Alert, Platform, TouchableHighlight, 
  TextInput, Image, ScrollView, Dimensions, ActivityIndicator, TouchableOpacity, ImageBackground } from 'react-native';
import firebase from './firebase_config';
import { Provider as PaperProvider } from 'react-native-paper'
import AppNavigator from './src/navigation'

class SignupLogin extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      username: '',
      password: '',
      confirmPassword: '',
      showLogin: true,
      isLoggedIn: false,
    };
    this.loginSuccess = this.loginSuccess.bind(this);
  }

  toggleShowLogin(){
    this.state({
      showLogin: true
    })
  }

  toggleShowSignup(){
    this.state({
      showLogin: false
    })
  }

  doLogin(){
    firebase.auth().signInWithEmailAndPassword(this.state.username, this.state.password).then( () => {
      console.log("login successful");
      // this.props.loginCB();
      this.loginSuccess();
    })
    .catch(function(error) {
      // Handle Errors here.
      console.log(error.code);
      console.log(error.message);
      alert(error.message);
      // ...
    })
  }

  doSignup(){
    // https://firebase.google.com/docs/auth/web/start

    // check if the two password fields match
    const password = this.state.password;
    const confirmPassword = this.state.confirmPassword;
    if (password === confirmPassword){
      // do signup
      firebase.auth().createUserWithEmailAndPassword(this.state.username, this.state.password).then( () => {
        console.log("created new user successful");
        this.toggleShowLogin(); // show login page
      })
      .catch(function(error) {
        // Handle Errors here.
        console.log(error.code);
        console.log(error.message);
        alert(error.message);
      });
    }
    else {
      alert("Password do not match !!!");
    }
  }

  showSignup() {
    return (
      <View>
        <View style={styles.group}>
          <Text style={styles.title}>Username</Text>
          <TextInput style={styles.input}
            value={this.state.username}
            onChangeText={(username) => this.setState({username})}/>
        </View>
        <View style={styles.group}>
          <Text style={styles.title}>Password</Text>
          <TextInput style={styles.input}
            secureTextEntry={true}
            value={this.state.password}
            onChangeText={(password) => this.setState({password})}
            />
        </View>
        <View style={styles.group}>
          <Text style={styles.title}>Confirm Password</Text>
          <TextInput style={styles.input}
            secureTextEntry={true}
            value={this.state.confirmPassword}
            onChangeText={(confirmPassword) => this.setState({confirmPassword})}
            />
        </View>
        <View style={styles.center}>
          <View style={styles.group}>
            <TouchableOpacity onPress={() => {this.toggleShowLogin();}}>
              <Text style={styles.signupText}>Login</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.group}>
            <TouchableOpacity style={styles.button}
              onPress={() => {this.doSignup()}}>
              <Text style={styles.buttonText}>Signup</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }

  showLogin() {
    return (
      <View>
        <View style={styles.group}>
          <Text style={styles.title}>Username</Text>
          <TextInput style={styles.input}
            value={this.state.username}
            onChangeText={(username) => this.setState({username})}/>
        </View>
        <View style={styles.group}>
          <Text style={styles.title}>Password</Text>
          <TextInput style={styles.input}
            secureTextEntry={true}
            value={this.state.password}
            onChangeText={(password) => this.setState({password})}
            />
        </View>
        <View style={styles.center}>
          <View style={styles.group}>
            <TouchableOpacity onPress={() => {this.toggleShowSignup();}}>
              <Text style={styles.signupText}>Signup</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.group}>
            <TouchableOpacity style={styles.button}
              onPress={() => {this.doLogin()}}>
              <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }

  // showLogin() {
  //   return (
  //     <SignupLogin loginCB={this.loginSuccess}/>
  //   )
  // }

  loginSuccess() {
    this.setState({
      isLoggedIn: true,
      showLogin : false
    })
  }

  render() {
    if (this.state.isLoggedIn){
      return  <AppNavigator/>
    }
    else{
      return (
        <View style={styles.containerLogin}>
          {/* <ImageBackground source={require('./bg.jpg')} style={styles.backgroundImage}> */}
            {!this.state.isLoggedIn? (this.state.showLogin ? this.showLogin() : this.showSignup()):null}
          {/* </ImageBackground> */}
        </View>
      );
    }
  }
}

export default function App() {
  return (
    <PaperProvider>
      {/* <AppNavigator /> */}
      <SignupLogin/>
    </PaperProvider>
  )
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover', // or 'stretch'
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: 20
  },
  title: {
    fontSize: 20,
    padding: 10
  },
  searchArea: {
    flexDirection: "row",
    padding: 10,
    backgroundColor: '#E5E4E3',
    borderRadius: 10,
    alignItems: 'center'
  },
  restaurantContainer: {
    padding: 5,
    margin: 10,
    backgroundColor: '#E5E4E3',
    width: 350,
    flex:1
  },
  restaurant: {
    padding: 5,
    margin: 5,
    backgroundColor: '#FFFFFF',
  },
  food_img: {
    width: 100,
    height: 100,
    margin: 3
  },
  star_img : {
    width: 120,
    height:30,
    margin: 3
  },
  star_container : {
    padding: 5,
    margin: 5,
    flexDirection : "row",
    backgroundColor: '#FFFFFF',
    alignItems: "center"
  },
  containerLogin: {
    // backgroundImage: require("./bg.jpg"),
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'column',
    padding: 20
  },
  group: {
    marginTop: 20
  },
  button: {
    backgroundColor: 'lightblue',
    padding: 20,
    borderWidth: 1
  },
  buttonText: {
    fontSize: 30
  },
  input: {
    padding: 10,
    height: 40,
    borderWidth: 1
  },
  title: {
    fontSize: 20
  },
  center: {
    alignItems: 'center'
  },
  signupText : {
    fontSize: 20,
    color: 'blue'
  }
});
