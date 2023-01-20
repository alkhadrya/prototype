import { StatusBar } from 'expo-status-bar';

import { StyleSheet, Text, View,Pressable,Image, ImageBackground} from 'react-native';
import {useNavigation} from '@react-navigation/native';


export default function Detail({ route }) {
const navigation = useNavigation();
const img=route.params.img;
return (
    <View style={styles.container}>
        
      <ImageBackground
        source={img}
        resizeMode='cover'
        imageStyle={styles.imageStyle}
        style={styles.ImageBackground}


      >
        <Pressable style={styles.retour1} onPress={()=>navigation.navigate('Home')}>
            <Image source={require('../assets/arrow_left.png')} style={{resizeMode:'cover',width:20,height:20,}}/>
        </Pressable>

            <Text style={styles.TitleText}>{route.params.nom}</Text>
        <View style={styles.dateAndCategory}>
          <Text style={styles.date}>{route.params.date}</Text>
          <Text style={styles.category}>{route.params.type}</Text>
          <Pressable style={styles.retour2} >
            <Image source={require('../assets/iconn.png')} style={{resizeMode:'cover',width:30,height:30,}}/>
        </Pressable>

        </View>
        

      </ImageBackground>

      <StatusBar style="auto" />
      <View style={styles.date}>

        <Text style={{ fontSize: 18, color: "gray", justifyContent: 'center', padding:20 }}>Lorem , consectetur adipiscing elit. Integer eget purus non nisi mattis placerat eget sed ex vel congue. Vestibulum condimentum gravida pellentesque. Nunc a hendrerit nunc. Mauris ultrices finibus urna, nec ullamcorper ante auctor ut.
        
         In lobortis metus eget quam volutpat, id ornare justo faucibus. Maecenas eu auctor nunc. 
         Etiam sed orci malesuada, placerat est non, elementum ex. Praesent est eros, molestie in fringilla quis, faucibus ut est. Vestibulum lobortis pellentesque placerat. Etiam ipsum quam, pretium ut efficitur quis, pharetra at </Text>

        <StatusBar style="auto" />
      </View>
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

  
  ImageBackground: {
    width: "100%",
    height: 300,
    justifyContent: "center",
    marginBottom: 30,
    marginTop: 5,
    borderRadius:'100%',

  },

  TitleText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 160,
    marginLeft: 20,
    paddingBottom: 10
  },
  dateAndCategory: {
    flexDirection: "row",
    marginLeft: 30
  },
  date: {
    color: "#eee",
    fontSize: 15,

  },
  category: {
    color: "#eee",
    marginLeft:10
  },
 
  
  imageStyle:{
    borderRadius:10
  }, 
  retour1:{
    height:20,
    width:45,
    padding:15,
    paddingBottom:30,
    alignItems:'center',
    marginRight:'80%',
    shadowColor:'#000',
    elevation:15,
    borderRadius:100,
    backgroundColor:'#fff',
    borderBottomColor:'black'
  },
  retour2:{
    height:50,
    width:50,
    padding:10,
    paddingBottom:30,
    position:'absolute',
    alignItems:'center',
    marginLeft:290,
    shadowColor:'#000',
    elevation:15,
    borderRadius:100,
    backgroundColor:'#fff',
    borderBottomColor:'black',
    
  }

 

  
 
});
