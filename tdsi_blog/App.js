import React from "react";
import { SafeAreaView, StyleSheet, TextInput, Text ,View} from "react-native";

const App = () => {
  const [text, onChangeText] = React.useState("Useless Text");
  const [number, onChangeNumber] = React.useState(null);

  return (
    <SafeAreaView
    style={styles.all}>
      <Text
      style={styles.title}>
        TDSI
      </Text>
      <Text
      style={styles.subtitle}>
        Blog
      </Text>
      <View 
      style={styles.div}>
      <Text
      style={styles.label}>
        TDSI
      </Text>
      <TextInput
        style={styles.input}
        onChangeText={onChangeText}
        value={text}
      />
      </View>
      
      <TextInput
        style={styles.input}
        onChangeText={onChangeText}
        value={text}
      />
      <TextInput
        style={styles.input}
        onChangeText={onChangeText}
        value={text}
      />
      <TextInput
        style={styles.input}
        onChangeText={onChangeText}
        value={text}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    width:'90%',
    borderRadius:'5',
    padding:'5%'
  },
  title:{
    fontSize:'40px',
    fontWeight: 'bold',
  },
  subtitle:{
    fontSize:'30px',
    fontWeight: 'bold',
    color:'orange'
  },
  all:{
    diplay:'flex',
    justifyContent:'space-between',
    height: '100%',
    alignItems:'center',
    backgroundColor:'red' 
  },
  label{

  },
  div:{
    
  }
});

export default App;