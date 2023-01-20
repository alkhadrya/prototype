import { StyleSheet, Text, View,ScrollView,Pressable,Image, Dimensions,TextInput } from 'react-native';
import Body from '../modules/Body';

export default function Home({navigation}) {
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
        <Pressable style={styles.module} onPress={()=>navigation.navigate('Reseaux')}>
            <Text style={{paddingHorizontal:5,fontWeight:'bold'}}>Réseaux</Text>
        </Pressable>
    </ScrollView>
    </View>  
    <Body />
        <Pressable style={styles.ajouter} onPress={()=>navigation.navigate('Nouveau')}><Text style={styles.plus}>+</Text></Pressable>
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
    backgroundColor:'black',
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
    color:'#fff',
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
  ajouter:{
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:'#FFC000',
    borderRadius:30,
    position:'absolute',
    bottom:5,
    right:5,
    width:60,
    height:60,
  },
  plus:{
    fontSize:40,
    color:'black'
  }
 
});
