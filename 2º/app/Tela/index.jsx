import { View, StyleSheet, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function App() {

const logoSkoob ='https://upload.wikimedia.org/wikipedia/commons/e/ea/Coruja-skoob.png';

return (
<View style={styles.container}>
<LinearGradient
       start={{ x: 1, y: 0}}
       end={{ x: 1, y: 1}}
       colors={['white', 'white','blue',]}
       style={styles.background}
     />
<Image
style={styles.logo}
source={{
uri: logoSkoob,
}}
/>
</View>
);
}
const styles = StyleSheet.create({
 container:{
   flex: 1,
   alignItems: 'center',
   justifyContent: 'center',
 },
 background:{
   position: 'absolute',
   left: 0,
   right: 0,
   top: 0,
   bottom: 0,
 },
 logo:{
   width: 260,
   height: 62,
 },
});