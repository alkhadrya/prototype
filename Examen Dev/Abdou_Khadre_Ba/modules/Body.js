import * as React from 'react';
import { StyleSheet, Text, View ,Pressable,Image,ScrollView,Dimensions} from 'react-native';
import {useNavigation} from '@react-navigation/native';


export default function Body() { 
    const navigation = useNavigation();
  return (
    <ScrollView>
    <View style={styles.body}>
        <View style={styles.bloc} >
            <Pressable style={styles.detail} onPress={() => navigation.navigate('Detail',{ nom: 'Angular JS',type:'Dev',date:'12 DEC 2022',img:require('../assets/image/dev1.jpg') })}>
                <Image source={require('../assets/image/dev1.jpg')} style={styles.image_back} />
            </Pressable>
            <Text style={styles.description}>Angular JS</Text>
            <Text style={styles.date}>12 DEC 2022 Dev</Text>
        </View>
        <View style={styles.bloc}>
            <Pressable style={styles.detail} onPress={() => navigation.navigate('Detail',{ nom: 'Type Script',type:'Dev',date:'13 DEC 2022',img:require('../assets/image/dev2.jpg') })}>
                <Image source={require('../assets/image/dev2.jpg')} style={styles.image_back}/>
            </Pressable>
            <Text style={styles.description}>Formation TypeScript</Text>
            <Text style={styles.date}>13 DEC 2022 Dev</Text>
        </View>
    </View>
    <View style={styles.body}>
        <View style={styles.bloc}>
            <Pressable style={styles.detail} onPress={() => navigation.navigate('Detail',{ nom: 'Firebase formation',type:'Dev',date:'12 DEC 2022',img:require('../assets/image/dev3.jpg') })}>
                <Image source={require('../assets/image/dev3.jpg')} style={styles.image_back}/>
            </Pressable>
            <Text style={styles.description}>Formation en firebase</Text>
            <Text style={styles.date}>13 NOV 2022 Dev</Text>
        </View>
        <View style={styles.bloc}>
            <Pressable style={styles.detail} onPress={() => navigation.navigate('Detail',{ nom: 'Securité dune application web',type:'Securité',date:'12 DEC 2022',img:require('../assets/image/sec1.jpg') })}>
                <Image source={require('../assets/image/sec1.jpg')} style={styles.image_back}/>
            </Pressable>
            <Text style={styles.description}>Securite d'une application web</Text>
            <Text style={styles.date}>11 MAY 2022 Sec</Text>
        </View>
    </View>
    <View style={styles.body}>
        <View style={styles.bloc}>
            <Pressable style={styles.detail} onPress={() => navigation.navigate('Detail',{ nom: 'Sécurité dans Devops',type:'Sécurité',date:'12 DEC 2022',img:require('../assets/image/sec2.jpg') })}>
                <Image source={require('../assets/image/sec2.jpg')} style={styles.image_back}/>
            </Pressable>
            <Text style={styles.description}>Securité dans Devops</Text>
            <Text style={styles.date}>30 JANV 2022 Sec</Text>
        </View>
        <View style={styles.bloc}>
            <Pressable style={styles.detail} onPress={() => navigation.navigate('Detail',{ nom: 'Veille de sécurité',type:'Sécurité',date:'02 FEB 2022',img:require('../assets/image/sec3.jpg') })}>
                <Image source={require('../assets/image/sec3.jpg')} style={styles.image_back}/>
            </Pressable>
            <Text style={styles.description}>Veille de securité</Text>
            <Text style={styles.date}>23 MARS 2022 Sec</Text>
        </View>
    </View>
    <View style={styles.body}>
        <View style={styles.bloc}>
            <Pressable style={styles.detail} onPress={() => navigation.navigate('Detail',{ nom: 'Reseau cablé',type:'Reseau',date:'12 DEC 2022',img:require('../assets/image/res1.jpg') })}>
                <Image source={require('../assets/image/res1.jpg')} style={styles.image_back}/>
            </Pressable>
            <Text style={styles.description}>Réseau cablé</Text>
            <Text style={styles.date}>24 june 2022 Res</Text>
        </View>
        <View style={styles.bloc}>
            <Pressable style={styles.detail} onPress={() => navigation.navigate('Detail',{ nom: 'Internet for ever',type:'Reseau',date:'12 DEC 2022',img:require('../assets/image/res2.jpg') })}>
                <Image source={require('../assets/image/res2.jpg')} style={styles.image_back}/>
            </Pressable>
            <Text style={styles.description}>Internet for ever</Text>
            <Text style={styles.date}>24 june 2022 Res</Text>
        </View>
    </View>
    <View style={styles.body}>
        <View style={styles.bloc}>
            <Pressable style={styles.detail} onPress={() => navigation.navigate('Detail',{ nom: 'Reseau for Angular JS',type:'Reseau',date:'12 DEC 2022',img:require('../assets/image/res3.jpg') })}>
                <Image source={require('../assets/image/res3.jpg')} style={styles.image_back}/>
            </Pressable>
            <Text style={styles.description}>Reseau for angular JS</Text>
            <Text style={styles.date}>24 june 2022 Res</Text>
        </View>
        <View style={styles.bloc}>
            <Pressable style={styles.detail} onPress={() => navigation.navigate('Detail',{ nom: 'Type Script',type:'Dev',date:'13 DEC 2022',img:require('../assets/image/dev2.jpg') })}>
                <Image source={require('../assets/image/dev2.jpg')} style={styles.image_back}/>
            </Pressable>
            <Text style={styles.description}>Formation TypeScript</Text>
            <Text style={styles.date}>13 DEC 2022 Dev</Text>
        </View>
    </View>
    <View style={styles.body}>
        <View style={styles.bloc}>
            <Pressable style={styles.detail} onPress={() => navigation.navigate('Detail',{ nom: 'Firebase formation',type:'Dev',date:'12 DEC 2022',img:require('../assets/image/dev3.jpg') })}>
                <Image source={require('../assets/image/dev3.jpg')} style={styles.image_back}/>
            </Pressable>
            <Text style={styles.description}>Formation en firebase</Text>
            <Text style={styles.date}>13 NOV 2022 Dev</Text>
        </View>
        <View style={styles.bloc}>
            <Pressable style={styles.detail} onPress={() => navigation.navigate('Detail',{ nom: 'Sécurité dans Devops',type:'Sécurité',date:'12 DEC 2022',img:require('../assets/image/sec2.jpg') })}>
                <Image source={require('../assets/image/sec2.jpg')} style={styles.image_back}/>
            </Pressable>
            <Text style={styles.description}>Securité dans Devops</Text>
            <Text style={styles.date}>30 JANV 2022 Sec</Text>
        </View>
    </View>
    
    </ScrollView>
  );
}

const styles = StyleSheet.create({
    body:{
        width:Dimensions.get('window').width,
        paddingHorizontal:5,
        flexDirection:'row',
        justifyContent:'space-between',
     },
     bloc:{
        width:'47%',
        marginVertical:5
     },
     image_back:{
        width:'100%',
        height:Dimensions.get('window').height * 0.18,
        borderRadius:5
     },
     description:{
        fontWeight:'bold'
     },
     date:{
        color:'gray'
     }
});
