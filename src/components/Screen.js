import {StyleSheet, Text,View,Image} from 'react-native'
import { useState,useContext, useEffect } from 'react'
import BasketContext from './BasketContext.js'
import { TouchableOpacity } from 'react-native-gesture-handler'
import {SafeAreaView,ScrollView,StatusBar} from 'react-native';

export default function Screen(e){
    const {basket,setBasket}=useContext(BasketContext)
    const [price,setPrice]=useState(0)

    function handleClear(){
        setBasket([])
    }

    function handlePrice(){
        let price1=0
        basket?.map((e,index)=>{
            price1+=parseInt(e.final_price,10)
        })
        setPrice(price1)
    }

    useEffect(()=>{
        handlePrice()
    })
    return(
        <>
            <View style={styles.basket}>
                <TouchableOpacity onPress={()=>handleClear()} style={styles.basketChild}>
                    <Text style={{color:'white'}}>გასუფთავება</Text>
                </TouchableOpacity>
            </View>
            <SafeAreaView style={styles.container}>
            <ScrollView style={styles.scrollView}>
                <View style={styles.main}>                  
                    {basket?.map((e,index)=>{
                        return(
                            <View key={index} style={styles.mainaChild}>
                                <View  style={styles.child1}>
                                    <Image source={{uri:`${e.thumb_img?.files?.file}`}} style={styles.image}/>
                                </View>
                                <View  style={styles.child2}>
                                    <View>
                                        <Text>{e.name}</Text>
                                        <Text>ფასი: {e.final_price} ლ</Text>
                                    </View>
                                </View>
                            </View>
                            )  
                        })}
                    <View style={{width:"100%",display:"flex",alignItems:"center"}}>
                        <View style={styles.price}>
                            <View>
                                <Text style={{fontSize:17}}>ჯამური ფასი:</Text>
                            </View>
                            <View>
                                <Text style={{fontSize:17}}>{price} ლ</Text>
                            </View>
                        </View>
                    </View>
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
      marginBottom:150,
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
        alignItems:'center',
        // justifyContent:'center',
    },basket:{
        width:'100%',
        flexDirection:'row',
        justifyContent:'flex-end',
        marginTop:10,
        marginBottom:30,
    },
    basketChild:{
        width:'80%',
        marginRight:"10%",
        // borderWidth:1,
        borderRadius:5,
        padding:5,
        backgroundColor:'black',
         alignItems:'center',
        // justifyContent:'flex-end',
    },
    price:{
        width:"80%",
        minHeight:80,
        borderWidth:1,
        display:'flex',
        flexDirection:'row',
        justifyContent:"space-around",
        alignItems:"center",
    }
  });