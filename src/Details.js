import React,{useState,useEffect} from "react";
import { View,Text,TouchableOpacity,StatusBar } from "react-native";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import Loader from "../src/components/Loader";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Storage from "../src/components/LocalStorage";
import Toast from "react-native-simple-toast";
import Arrow from "../src/assets/HeaderArrow.svg";


const Details=({route})=>{
    const navigation=useNavigation()
    const [loader,setLoader]=useState(false)
    const [data,setData]=useState()
    const arr=route.params.scannedData.split('/')


    useEffect(()=>{
       apiCall()
    },[])

    const apiCall=async()=>{
          
        const user_token=await AsyncStorage.getItem(Storage.user_token)
        setLoader(true)
        axios({
            method: 'get',
            url: `http://45.79.123.102:49002/api/event/scan/event/${arr[arr.length-2]}/${arr[arr.length-1]}`,
            headers: `Authorization: ${user_token}`
          })
          .then(function(response) {
            if(response.data.code=='200'){
               setData(response.data.data)
               setLoader(false)
               Toast.show(response.data.message )
            }
            else{
              setLoader(false)
              Toast.show(response.data.message )
            }
          })
          .catch(function(error) {
            setLoader(false)
            console.log("error", error.response.data)
            Toast.show(error.response.data.message)
          })

    }


    return(
       <View style={{flex:1,backgroundColor:'#fff'}}>
        {loader?<Loader/>:null}
         <View style={{ height: 50, 
        width: '100%', 
        justifyContent: 'space-between', 
        flexDirection: 'row', 
        alignItems: 'center', 
        paddingHorizontal: 20,
        backgroundColor:'#000000'
         }}>
            <TouchableOpacity onPress={()=>navigation.goBack()}>
            <Arrow/>
            </TouchableOpacity>
          <Text style={{fontSize:16,color:'#FCDA64',fontFamily:'Montserrat-Bold'}}>Member Details</Text>
          <View/>
        </View>
        {data?<View style={{padding:20}}>
            <Text style={{fontSize:15,color:'#000',fontFamily:'Montserrat-SemiBold'}}>{`Name : ${data?.userFirstName} ${data?.userLastName}`}</Text>
            <Text style={{fontSize:15,color:'#000',fontFamily:'Montserrat-SemiBold',marginTop:5}}>{`Event Name : ${data?.eventName}`}</Text>
            <Text style={{fontSize:14,color:'#000',fontFamily:'Montserrat-SemiBold',marginTop:5}}>{`Date : ${data?.eventDate}`}</Text>
            <Text style={{fontSize:14,color:'#000',fontFamily:'Montserrat-SemiBold',marginTop:5}}>{`Time : ${data?.eventTime}`}</Text>
        </View>:null}
        <StatusBar
        backgroundColor={'#000'}
        />
            {/* <Text style={{color:'#000',fontWeight:'700'}}>{`Details :${route.params.scannedData}`}</Text> */}
       </View>
    )
}
export default Details;
const QrCode= 
    {
        userFirstName: "Narendra",
        userLastName: "Pal",
        eventName: "Narendra Events1",
        eventDate: "Jan 21 2024",
        eventTime: "4:54 PM"
    }
