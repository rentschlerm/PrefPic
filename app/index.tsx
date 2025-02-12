import { useRouter } from "expo-router";
import React from "react";
import CheckBox from "expo-checkbox" 
import { Image,ImageBackground  ,View,Text, StyleSheet, TouchableOpacity,Linking,Alert} from "react-native"
import { useState,useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as CryptoJS from "crypto-js"; // Alternative TypeScript import
import { AuthContext } from "./AuthContext"; // Import global AuthContext
import { XMLParser } from "fast-xml-parser";
import { useContext } from "react";


export default function StartScreen(){

  const [isChecked, setChecked] = useState(false);
  const router = useRouter();

  const { saveAuthCode } = useContext(AuthContext) ?? {}; // Ensure useContext works

  // Mocked device info and location (Replace with actual values)
  const handleGetStarted = async () => {
    try {
      // Static Device ID (Replace if needed)
      const deviceID = "ab02345lasl23rlksjl234"; 
  
      // Generate formatted date (MM/DD/YYYY-HH:mm)
      const currentDate = new Date();
      const formattedDate = `${String(currentDate.getMonth() + 1).padStart(2, '0')}/${String(
        currentDate.getDate()
      ).padStart(2, '0')}/${currentDate.getFullYear()}-${String(currentDate.getHours()).padStart(2, '0')}:${String(
        currentDate.getMinutes()
      ).padStart(2, '0')}`;
  
      // Generate Key using SHA1 (DeviceID + Date)
      const keyString = `${deviceID}${formattedDate}`;
      const key = CryptoJS.SHA1(keyString).toString();
  
      // Construct API URL (No SecurityCode or Location)
      const url = `https://PrefPic.com/dev/PPService/AuthorizeDevice.php?DeviceID=${encodeURIComponent(
        deviceID
      )}&Date=${formattedDate}&Key=${key}&PrefPicVersion=1`;
  
      console.log("API Request URL:", url);
  
      // Call API
      const response = await fetch(url);
      const data = await response.text();
      console.log("🔹 API Response:", data);
  
      // Parse XML Response
      const parser = new XMLParser();
      const result = parser.parse(data);
      const resultInfo = result?.ResultInfo;
  
      if (resultInfo) {
        const resultCode = resultInfo.Result;
        const message = resultInfo.Message;
  
        if (resultCode === "Success") {
          const authorizationCode = resultInfo.Auth; // ✅ Authorization Code
  
          // Store Authorization Code in AsyncStorage
          await AsyncStorage.setItem("authorizationCode", authorizationCode);
  
          console.log("Authorization Code Stored:", authorizationCode);
  
          // ✅ Navigate to Library.tsx
          router.push("/library");
        } else {
          Alert.alert("Authorization Failed", message || "An unknown error occurred");
        }
      } else {
        Alert.alert("Authorization Failed", "The server response was not in the expected format.");
      }
    } catch (error) {
      console.error("Error during authorization:", error);
      Alert.alert("Authorization Failed", "An error occurred during authorization.");
    }
  };
  

  useEffect(() => {
    console.log("isChecked updated:", isChecked);
  }, [isChecked]);

  const navigateToIndex = () => {
    console.log("isChecked before navigation:", isChecked); // Debugging log
    if (!isChecked) {
      Alert.alert("Terms & Privacy", "You must accept the Terms and Privacy Policy to proceed.");
      return;
    }
    handleGetStarted(); // ✅ Call the function when "Get Started" is clicked
  };




return (


   <ImageBackground
        source={require("../assets/Start.jpg")} // Replace with your image path
         style={styles.background}
     >
     
     <View style={[styles.container]}>
    <Image source={require("../assets/gray.jpg")}style={styles.imagestyle}/>
     <Text style={styles.pref}>PrefPic Demo</Text>
        <Text style= {styles.description}>There is no sign-in required for </Text>
       <Text > this demo version. The live </Text>
        <Text>version is password protected. </Text>
       
       {/* Checkbox*/}
       <View style={styles.checkboxContainer}>
          <CheckBox 
            value={isChecked} 
            onValueChange={(newValue) => {
              console.log("Checkbox clicked:", newValue); // Debugging log
              setChecked(newValue);
            }} 
          />
       <Text 
        style={styles.link} 
        onPress={() => Linking.openURL("https://prefpic.com/terms.html")}
      >
        Accept Terms
      </Text>
      <Text> and </Text>
      <Text 
        style={styles.link} 
        onPress={() => Linking.openURL("https://prefpic.com/privacypolicy.html")}
      >
        Privacy Policy
      </Text>
       </View>

        {/* Button*/}
        <View style={styles.bcontainer}>
        <TouchableOpacity 
            style={[styles.getButton, { opacity: isChecked ? 1 : 0.5 }]} 
            onPress={navigateToIndex}
            disabled={!isChecked} // Prevents clicking when unchecked
          >
            <Text style={styles.GetText}>Get Started</Text>
          </TouchableOpacity>
        </View>
      
      </View>
     </ImageBackground>
  

)

}

const styles = StyleSheet.create({
  GetText:{
    color: 'white',
    fontSize: 15,
    alignItems: 'center'
  },
  getButton:{
    backgroundColor: "#375894",
    alignItems: 'center',
    borderRadius: 31,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 10,
    paddingRight: 10,
    gap: 10,
    width: 250
  
    
  },
  pref:{
    fontSize: 30,
    paddingTop: 30,
    lineHeight: 33,
    fontWeight: 600,
    paddingLeft: 45,
    paddingRight: 45,
   
    
   

    
  },

  container: {
    flex: .7,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#E7EFFF",
    borderRadius: 10,
    marginTop: 15,
    marginBottom: 15,
    marginLeft: 28, // 10px from left
    marginRight: 28, // 10px from right
    height: 452,
    width: 320,
    color: "#FFFFFF"
    

  },
   background: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  overlay: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    padding: 20,
    borderRadius: 10,
  },
  text: {
    color: "#fff",
    fontSize: 15,
    marginTop: 10,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingTop: 60
  },
  description: {
    fontSize: 15,
    textAlign: 'justify',
    justifyContent: 'space-between',                                                      
    fontWeight: 400,
    
    paddingTop: 20,
    paddingLeft: 44,
    paddingRight: 44,
  
   
  },
  accept: {
    fontSize: 11,
    gap: 4,
    fontWeight: 400
  },
  bcontainer:{
    
    
    
    width: 250,
    paddingTop: 50,
  
    
    paddingBottom: 1,
  },
  imagestyle:{
    width: 75,  
    height: 75,
    borderRadius: 50,
    paddingTop: 61
  },
  link: {
    color: "blue",
    textDecorationLine: "underline",
  }
   

});

