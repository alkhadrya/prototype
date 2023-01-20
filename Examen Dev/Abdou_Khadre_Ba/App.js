import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Compte from './composants/Compte';
import Connexion from './composants/Connexion';
import Home from './composants/Home';
import Securite from './modules/Securite';
import Body from './modules/Body';
import Developpement from './modules/Developpement';
import Reseaux from './modules/Reseaux';
import Systeme from './modules/Systeme';
import Dev_Blog from './Nouveaux_Blogs/Dev_Blog';
import New_Blog from './Nouveaux_Blogs/New_Blogs';
import Detail from './composants/Detail';

const Stack = createNativeStackNavigator();

export default function App() {
  return(
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen options={{headerShown:false}} name="Connexion" component={Connexion} />
        <Stack.Screen options={{headerShown:false}} name="Compte" component={Compte} />
        <Stack.Screen options={{headerShown:false}} name="Home" component={Home} />
        <Stack.Screen options={{headerShown:false}} name="Securite" component={Securite} />
        <Stack.Screen options={{headerShown:false}} name="Developpement" component={Developpement}/>
        <Stack.Screen options={{headerShown:false}} name="Reseaux" component={Reseaux} />
        <Stack.Screen options={{headerShown:false}} name="Systeme" component={Systeme} />
        <Stack.Screen options={{headerShown:false}} name="Dev_Blog" component={Dev_Blog} />
        <Stack.Screen options={{headerShown:false}} name="Nouveau" component={New_Blog} />
        <Stack.Screen options={{headerShown:false}} name="Detail" component={Detail} />
        <Stack.Screen options={{headerShown:false}} name="Body" component={Body} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
