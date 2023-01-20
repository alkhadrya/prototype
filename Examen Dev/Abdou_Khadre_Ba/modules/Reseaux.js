import { StyleSheet, Text, View,ScrollView,Pressable,Image, Dimensions } from 'react-native';
import Body from '../modules/Body';

export default function Reseaux({navigation}) {
  return (
    <View style={styles.container}>
    <View 
    style={{width:'100%',height:10,
    flexDirection:'row',justifyContent:'space-between',
    height:'10%',paddingHorizontal:5}}
    >
        <View style={styles.logo}>
            <Text style={{fontSize:20,fontWeight:'bold'}}>TDSI</Text>
            <Text style={{fontWeight:'bold',color:'#FFC000'}}>Blog</Text>
        </View>
        <Pressable style={styles.retour} onPress={()=>navigation.navigate('Connexion')}>
            <Text>Se déconnecter</Text>
            <Image source={require('../assets/upload.png')} style={{resizeMode:'cover',width:20,height:20}}/>
        </Pressable>
    </View>
    <View style={styles.entete}>
    <ScrollView
      style={styles.scrollView}
       pagingEnabled
       horizontal
       showsHorizontalScrollIndicator={false}
      >
        <Pressable style={styles.tous} onPress={()=>navigation.navigate('Home')}>
            <Text style={styles.all}>Tous</Text>
        </Pressable>
        <Pressable style={styles.module} onPress={()=>navigation.navigate('Securite')}>
            <Text style={{paddingHorizontal:5,fontWeight:'bold'}}>Sécurité</Text>
        </Pressable>
        <Pressable style={styles.module} onPress={()=>navigation.navigate('Developpement')}>
            <Text  style={{paddingHorizontal:10,fontWeight:'bold'}}>Dév</Text>
        </Pressable>
        <Pressable style={styles.module} onPress={()=>navigation.navigate('Systeme')}>
            <Text style={{paddingHorizontal:5,fontWeight:'bold'}}>Systeme</Text>
        </Pressable>
        <Pressable style={styles.module_active} onPress={()=>navigation.navigate('Reseaux')}>
            <Text style={{paddingHorizontal:5,fontWeight:'bold',color:'#fff'}}>Réseaux</Text>
        </Pressable>
    </ScrollView>
    </View>  
    <ScrollView>
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

    </View>
    </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingTop:40
  },
  module:{
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:'white',
    borderWidth:1,
    borderRadius:20,
    borderColor:'gray',
    padding:5,
    height:'100%',
    marginHorizontal:7
  },
  tous:{
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:'#fff',
    borderRadius:20,
    shadowColor:'black',
    elevation:15,
    height:'100%',
    marginHorizontal:7
  },
  entete:{
    height:Dimensions.get('window').height * 0.05,
    flexDirection:'row',
    justifyContent:'space-around',
    marginBottom:10

  },
  all:{
    color:'black',
    fontSize:15,
    fontWeight:'bold',
    paddingHorizontal:10
  },
  retour:{
    flexDirection:'row',
    justifyContent:'flex-end',
    height:'50%'
  },
  module_active:{
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:'black',
    borderWidth:1,
    borderRadius:20,
    borderColor:'gray',
    padding:5,
    height:'100%',
    marginHorizontal:7
  },
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
