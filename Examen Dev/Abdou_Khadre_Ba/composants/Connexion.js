import React from "react";
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaView, StyleSheet, Text, Button, View, ImageBackground, TextInput, Pressable} from 'react-native';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

import { auth } from "../firebaseConfig"

// page de connexion

function SignIn({ navigation }) {
    const [email, onChangeEmail] = React.useState("Useless Text");
    const [password, onChangePassword] = React.useState(null);

    const onTextInputChange = (value) => {
      console.log('Valeur text input', value)
      onChangeEmail(value)
    }

    const SignInWithEmailAndPassword = (email, password) => {
      console.log('email', email, 'password', password)

      signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        console.log(user);
        // ...
        navigation.navigate('Home')
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log('errorcode' ,errorCode, 'errormessage', errorMessage)
      });
    }
    
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', paddingBottom: 330 }}>
            <View style={styles.tdsi_blog}> 
                <Text style={styles.tdsi}>TDSI</Text>
                <Text style={styles.blog}>Blog</Text>
            </View>

            <View style={styles.champs_button}>
                
                <Text style={styles.email_mdp}>Email</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={onChangeEmail}
                    // placeholder = {"Email"}
                    keyboardType={"email-adress"}
                />

                <Text style={styles.email_mdp}>Mot de passe</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={onChangePassword}
                    // placeholder="Password"
                    // keyboardType={"visible-password"}
                    secureTextEntry={true}
                />

                    <Pressable
                        style={styles.button_style1}                         
                        onPress={()=> SignInWithEmailAndPassword(email, password)}
                        accessibilityLabel="Bouton pour se connecter"
                    >
                        <Text style={styles.se_connecter}>SE CONNECTER</Text>
                    </Pressable> 

            </View>
            <View style={styles.membre_enregistrer}>
                    <Text style={styles.enregistrer}>Vous n'êtes pas encore membre?</Text>
                    <Pressable
                    style={styles.button_style2}                         
                    onPress={()=> navigation.navigate('Inscription')}
                    accessibilityLabel="Bouton pour s'enregistrer"
                    >
                    <Text style={styles.en_bas}>S'ENREGISTRER</Text>
                    </Pressable> 
            </View>

        </View>
      
    );
  };


  const styles = StyleSheet.create({

    button_style1 : {
        marginTop: 25,
        marginLeft: 10,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#272727",
        width: wp("100%") -30,
        height: hp("6%"),
        borderRadius: 10,
    },

    button_style2 : {
        marginTop: 15,
        justifyContent: "center",
        alignItems: "center",
        // backgroundColor: "#272727",
        width: wp("100%") -30,
        height: hp("6%"),
        borderWidth: 0.5,
        borderRadius:10,
        borderColor: "grey"
    },


    champs_button: {
        // backgroundColor: "blue",
        marginTop: 100
        // height: 400,
        // paddingTop: 100,
        // backgroundColor: "blue"
        // fontFamily: ""
    },
    

    tdsi_blog: {
        // backgroundColor: "green",
        marginTop: 340,
    },

    tdsi: {
        fontWeight: "bold",
        fontSize: 60,
    },

    blog: {
        fontWeight: "bold",
        fontSize: 25,
        color: "#fad64e",
        marginBottom: 15
    },

    bordure: {
        height: hp("6%"),
        borderWidth: 1
    },

    email_mdp: {
        marginLeft: 10,
        color: 'grey'
    },

    se_connecter: {
        color: "white",
        fontSize: 16,
        fontWeight: "bold"
    },

    en_bas: {
        color: "black",
        fontSize: 16,
        fontWeight: "bold"
    },
    
    membre_enregistrer: {
        // height: hp("10%"),
        marginTop: 100,
        // backgroundColor: "red",
        justifyContent: "center",
        alignItems: "center",
        // paddingTop: 140,
        // marginTop: 30
    },

    input: {
      height: hp("6.5%"),
      width: wp("100%")-30,
      margin: 12,
      borderWidth: 1,
      borderRadius: 10,
      padding: 10,
      borderColor: "grey"
      },
    
    membre: {
        fontSize: 17,
        color: 'grey',
        paddingBottom: 20
    },
    enregistrer: {
        marginTop: 10,
        fontSize: 17,
        color: 'grey',
    }
  });

export default SignIn;