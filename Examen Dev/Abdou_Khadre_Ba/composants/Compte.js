import React from "react";
import { NavigationContainer } from '@react-navigation/native';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { SafeAreaView, StyleSheet, Text, Button, View, ImageBackground, TextInput, Pressable} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

import { auth } from "../firebaseConfig"

// page d'inscription

function Compte({ navigation }) {
    const [email, onChangeEmail] = React.useState("");
    const [password, onChangePassword] = React.useState("");
    const [name, onChangeName] = React.useState("");

    const onTextInputChange = (value) => {
      console.log('Valeur text input', value)
      onChangeEmail(value)
    }

    const createNewUserWithEmailAndPassword = (email, password) => {
      console.log('email', email, 'password', password)

      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        console.log(user);

        navigation.navigate('Connexion')
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log('Erreur', error)
        });
    }
    
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', paddingBottom: 310 }}>

            <View style={styles.tdsi_blog}> 
                <Text style={styles.tdsi}>TDSI</Text>
                <Text style={styles.blog}>Blog</Text>
            </View>
        <View style={styles.champs_button}>

        <Text style={styles.textes}>Nom complet</Text>
        <TextInput
          style={styles.input}
          onChangeText={onChangeName}
          // placeholder = {"Nom complet"}
          keyboardType={"email-adress"}
        />  

        <Text style={styles.textes}>Email</Text>
        <TextInput 
          style={styles.input}
          onChangeText={onChangeEmail}
          // placeholder = {"Email"}
          keyboardType={"email-adress"}
        />

        <Text style={styles.textes}>Mot de passe</Text>
        <TextInput
          style={styles.input}
          onChangeText={onChangePassword}
          // placeholder="Password"
        //   keyboardType={"visible-password"}
          secureTextEntry={true}
        />

        <View>
        <Pressable
            style={styles.button_style1}                         
            onPress={()=> createNewUserWithEmailAndPassword(email, password)}
            accessibilityLabel="Bouton pour se connecter"
        >
              <Text style={styles.enregistrer}>S'ENREGISTRER</Text>
        </Pressable> 
        </View>

      </View>

           <View style={styles.compte_connecter}>
                    <Text style={styles.compte}>Vous avez déjà un compte?</Text>
                    <Pressable
                    style={styles.button_style2}                         
                    onPress={()=> navigation.navigate('Connexion')}
                    accessibilityLabel="Bouton pour s'enregistrer"
                    >
                    <Text style={styles.se_connecter}>SE CONNECTER</Text>
                    </Pressable> 
            </View>
      </View>
      
    );
  };


  const styles = StyleSheet.create({
    champs_button: {
      paddingTop: 60,
      // fontFamily: ""
  },

    tdsi_blog: {
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
    
  textes: {
    marginLeft: 10,
    color: 'grey'
  },
    
    input: {
      height: hp("7%"),
      width: wp("100%")-30,
      margin: 12,
      borderWidth: 1,
      borderRadius: 10,
      padding: 10,
      borderColor: "grey"
      },

      signIn: {
        marginTop: 55,
        width: 350
      },

      av_compte: {
        fontSize: 17,
        color: 'grey',
        marginLeft: 60,
        marginBottom: 10
      },

      enregistrer: {
        color: "white",
        fontSize: 16,
        fontWeight: "bold"
    },

      se_connecter: {
        color: "black",
        fontSize: 16,
        fontWeight: "bold"
    },

      compte_connecter: {
        marginTop: 20,
        ustifyContent: "center",
        alignItems: "center",
      },

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

    compte: {
      marginTop: 70,
      fontSize: 17,
      color: 'grey',
  }
  });

export default Compte;