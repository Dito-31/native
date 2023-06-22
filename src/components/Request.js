import AsyncStorage from '@react-native-async-storage/async-storage'
import { useNavigation} from '@react-navigation/native'
import {StyleSheet, Text,View,Image} from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import {useContext } from 'react'
import BasketContext from './BasketContext.js'
import {SafeAreaView,ScrollView,StatusBar,} from 'react-native';

export default function Request(props){
    const {basket,setBasket}=useContext(BasketContext)
    const navigation=useNavigation()

    function LogOut(){
        AsyncStorage.removeItem('user').then(()=>{
            navigation.replace('Home')
        })
    }

    function GoBasket(){
        navigation.navigate('Screen')
    }
    
    function Basket(e){
        setBasket(prevState => [...prevState,e]);
    }
    return(
        <>
            <View style={styles.basket}>
                <TouchableOpacity onPress={()=>LogOut()} style={[styles.basketChild,{marginTop:10,backgroundColor:'gray'}]}>
                    <Text style={{color:"black",fontSize:16}}>გასვლა</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>GoBasket()} style={[styles.basketChild,{marginTop:10,backgroundColor:'gray'}]}>
                    <Text style={{color:"black",fontSize:16}}>კალათა</Text>
                </TouchableOpacity>
            </View>
            <SafeAreaView style={styles.container}>
            <ScrollView style={styles.scrollView}>
                <View style={styles.main}>                    
                    {props.props?.map((e,index)=>{
                        // console.log(e)
                        return(
                            <View key={index} style={styles.mainaChild}>
                                <View  style={styles.child1}>
                                    <Image source={{uri:`${ e.thumb_img?.files?.file}`}} style={styles.image}/>
                                </View>
                                <View  style={styles.child2}>
                                    <View>
                                        <Text>{e.name}</Text>
                                    <Text>ფასი: {e.final_price} ლ</Text>
                                    </View>
                                    <View>
                                       <TouchableOpacity onPress={()=>Basket(e)} style={styles.basketChild}>
                                            <Text  style={{color:"white"}}>დამატება</Text>
                                        </TouchableOpacity> 
                                    </View> 
                                </View>
                            </View>
                            ) 
                    })}    
                </View>
            </ScrollView>
        </SafeAreaView>
        </>
    )
}

const styles = StyleSheet.create({
    scrol1:{
      flex: 1,
      paddingTop: StatusBar.currentHeight,
    },
    scrol2:{
       marginHorizontal: 20,
    },
    main: {
      margin:10,
      marginBottom:30,
      width:'95%',
      
    },
    mainaChild:{
        width:'100%',
        borderWidth:1,
        flexDirection:'row',
        marginBottom:50,
    },
    image:{
        width:'100%',
        minHeight:150
    },
    child1:{
        width:"40%"
    },
    child2:{
        width:"60%",
        display:'flex',
        flexDirection:"column",
        alignItems:'center',
        justifyContent:"space-around",

    },
    basket:{
        width:'100%',
        flexDirection:'row',
        justifyContent:'flex-end',
        marginBottom:30,
    },
    basketChild:{
        width:'80%',
        marginRight:"10%",
        borderRadius:5,
        padding:5,
        backgroundColor:'black',
         alignItems:'center',
    },
  });