import { StyleSheet, Text, View,ScrollView,Pressable,Image, Dimensions,TextInput,COLORS } from 'react-native';
import Body from '../modules/Body';

export default function     Reseaux_Blog({navigation}) {
  return (
    <View style={styles.container}>
    <View style={{width:'100%',height:10}}>
        <Pressable style={styles.retour} onPress={()=>navigation.navigate('Home')}>
            <Image source={require('../assets/arrow_left.png')} style={{resizeMode:'cover'}}/>
        </Pressable>
    </View>
    <Text style={{width:'90%',marginTop:30}}>Choisir la catégorie</Text>
    <View style={styles.entete}>
    <ScrollView
      style={styles.scrollView}
       pagingEnabled
       horizontal
       showsHorizontalScrollIndicator={false}
      >
        <Pressable style={styles.module} >
            <Text style={{paddingHorizontal:5,fontWeight:'bold'}}>Sécurité</Text>
        </Pressable>
        <Pressable style={styles.module_active}>
            <Text  style={{paddingHorizontal:10,fontWeight:'bold',color:'#fff'}}>Dév</Text>
        </Pressable>
        <Pressable style={styles.module}>
            <Text style={{paddingHorizontal:5,fontWeight:'bold'}}>Systeme</Text>
        </Pressable>
        <Pressable style={styles.module}>
            <Text style={{paddingHorizontal:5,fontWeight:'bold'}}>Réseaux</Text>
        </Pressable>
    </ScrollView>
    </View> 
    <View style={styles.formulaire}>
        <Text style={styles.texte}>Titre du blog</Text>
        <TextInput style={styles.inputText} placeholder='Ajouter le titre ici'/>
    </View>
    <Text style={{width:'90%',marginTop:30}}>Description</Text>
    <View style={styles.textAreaContainer} >
    <TextInput
      style={styles.textArea}
      underlineColorAndroid="transparent"
      placeholder="Type something"
      placeholderTextColor="grey"
      numberOfLines={10}
      multiline={true}
    />
    </View>
     
    <Pressable style={styles.connexion} onPress={()=>navigation.navigate('Home')}>
        <Text style={styles.connecte}>SE CONNECTER</Text>
    </Pressable>
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
    marginHorizontal:5
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
    marginBottom:10,
    width:'100%',
    paddingHorizontal:15,
    marginTop:10
  },
  all:{
    color:'black',
    fontSize:15,
    fontWeight:'bold',
    paddingHorizontal:10
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
  inputText:{
    width:'100%',
    height:Dimensions.get('window').height * 0.06,
    borderWidth:1,
    borderRadius:5,
    paddingHorizontal:20,
    borderColor:'gray',
  },
  formulaire:{
    width:'100%',
    width:'90%',
  },
  connecte:{
    color:'#fff',
    fontSize:15,
    fontWeight:'bold'
  },
  connexion:{
    justifyContent:'center',
    alignItems:'center',
    width:'90%',
    height:Dimensions.get('window').height * 0.07,
    backgroundColor:'black',
    borderRadius:5,
    marginTop:50
  },
  textAreaContainer: {
    borderWidth: 1,
    padding: 5,
    width:'90%',
    borderRadius:10,
  },
  textArea: {
    height: 150,
    justifyContent: "flex-start"
  },
  retour:{
    height:40,
    width:40,
    shadowColor:'#000',
    elevation:25,
    borderRadius:500,
    justifyContent:'center',
    alignItems:'center',
    marginLeft:10,
    backgroundColor:'#fff'
  }
});
