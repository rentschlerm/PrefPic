import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useState,useEffect } from "react"; //import useEffect for clear cache RJP 2/11/2025
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { Alert } from "react-native"; //import for alert in api call Alberto 2/11/2025

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F8FF",
    padding: 16,
  },

  backText: {
    fontSize: 16,
    color: "#007AFF",
  },

  header: {
    fontSize: 20,
    textAlign: "center",
    marginVertical: 16,
    paddingTop: 30,
  },

  buttonContainer: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "flex-end",
    paddingBottom: 20,
    flexDirection: "row",
    width: "100%",
  },

  nextbutton: {
    backgroundColor: "#375894",
    padding: 16,
    borderRadius: 31,
    alignItems: "center",
    marginLeft: 10,
    width: 120,
    flex: 1,
    
  },

  retakebutton: {
    backgroundColor: "#FFFFFF",
    padding: 14,
    borderRadius: 31,
    alignItems: "center",
    borderColor: "#375894",
    width: 180,
    borderWidth: 2,
  },

  retakebuttonText: {
    color: "#375894",
    fontSize: 16,
    fontWeight: "600",
  },

  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },

  image: {
    width: 330,
    height: 490,
    marginTop: 5,
    borderRadius: 20,
    padding: 12,
    justifyContent: "center",
    alignItems: "center",
  },

  fullImageOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(41, 41, 41, 0.8)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  },

  fullImage: {
    width: "100%",
    height: "100%",
    objectFit: "contain",
  },

  closeButton: {
    position: "absolute",
    top: 140,
    right: 20,
    backgroundColor: "rgb(255, 255, 255)",
    borderRadius: 30, 
    padding: 8, 
    zIndex: 1001,
    justifyContent: "center",
    alignItems: "center", 
  },
  
  closeButtonText: {
    fontSize: 20, 
    fontWeight: "bold", 
    color: "#000", 
  },
  
});

export default function reviewImage() {
  const router = useRouter();

  //RJP -> 2/7/2025
  // (import) image and procedure name from add_2.tsx 
  const { photoUri, procedureName } = useLocalSearchParams<{
    photoUri: string;
    procedureName: string;
  }>();

  //RJP -> 2/7/2025
  // Decode the photo URI
  //const decodedPhotoUri = photoUri ? decodeURIComponent(photoUri) : null;
  // Store photoUri in a state variable
  const [photoUriState, setPhotoUriState] = useState<string | null>(null);

  //RJP 2/11/2025
  //force React Native to reload the image.
  useEffect(() => {
    if (photoUri) {
      // Append a cache-busting query parameter to force image reload
      setPhotoUriState(decodeURIComponent(photoUri) + `?t=${Date.now()}`);
    } else {
      setPhotoUriState(null);
    }
  }, [photoUri]);

  //RJP
  // Debug log to check if URI is correct 
  //console.log("Received photoUri: ", decodedPhotoUri);  // Check if the URI is correct

  const [isPreview, setIsPreview] = useState(false);  
  /*
  const navigateToCamera = () => {

    //RJP -> 2/7/2025
    // Use replace instead of push to go back to camera without stacking screens
    router.replace("camera1"); 
  };
  */
 /*
  const navigateToCamera = () => {
    // Reset photoUri before navigating back
    router.replace({
      pathname: "camera1",
      params: { photoUri: null }, // Clear photoUri
    });
  };
  */

  const navigateToCamera = () => {
    // Reset photoUriState before navigating back
    setPhotoUriState(null);
    router.replace("camera"); // Navigate back to the camera screen
  };


  //2/11/2025 Alberto Added api calls template

 const [isLoading, setIsLoading] = useState(false);
 const navigateToReviewSummary = async () => {
  if (!photoUriState || !procedureName) return;

  setIsLoading(true); // Show loading state if needed

  try {
    // Convert data to form-urlencoded format
    const formBody = new URLSearchParams({
      procedure: procedureName,
      imageUrl: photoUriState,
      timestamp: new Date().toISOString(),
    }).toString();

    console.log("Sending request with form data:", formBody);

    const apiUrl = "https://prefpic.com/dev/PPService/CreatePicture.php?DeviceID=ab02345lasl23rlksjl234&amp;Date=1%201/22/2013-%2023:00&amp;Key=0a5dc4dc2305aafb91fbe58da5092d24ab4727b0&amp;AC=tetstaccountauthorizationcod%20e&amp;PrefPicVersion=1&amp;Name=Chefs%20special%20replacement%20of%20the%20day";

    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: formBody,
    });

    const text = await response.text(); // Get raw response
    console.log("Raw API Response:", text);
    
    Alert.alert("Response", text); // Show response in an alert

  } catch (error) {
    console.error("API Error:", error);
    Alert.alert("Error", "Failed to send request.");
  } finally {
    setIsLoading(false);
  }
};


  //open bleed view
  const handleImageClick = () => {
    setIsPreview(true); 
  };

  //close bleed view
  const handleClosePreview = () => {
    setIsPreview(false); 
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <TouchableOpacity onPress={navigateToCamera}>
        <Text style={styles.backText}>←  Back</Text>
      </TouchableOpacity>
      
      <Text style={styles.header}>Image for: {procedureName}</Text> 

      {/* RJP -> 2/8/2025
        change image source to retrieve image taken from camera
      */}

      {/*Alberto -> 2/11/2025 
      use photoUri instead of decodedPhotoUri
      */}
      {/* Change photoUri to photoUriState lookup for the function -> RJP 2/11/2025 */}
      {photoUriState   ? (
      <TouchableOpacity onPress={handleImageClick}>
        <Image style={styles.image} source={{ uri: photoUriState  }} /> 
      </TouchableOpacity>
      ) : (
  <Text>No image available</Text>  // Show this if the URI is invalid or missing
)}


      {/* Full Image Overlay */}
      {/* fix photoUri to show only one image on display or full image -> RJP 02/11/2025*/}
      {isPreview && (
        <View style={styles.fullImageOverlay}>
          <TouchableOpacity onPress={handleClosePreview} style={styles.closeButton}>
            <Text style={styles.closeButtonText}>X</Text>
          </TouchableOpacity>
          <Image style={styles.fullImage} source={ photoUriState ? { uri: photoUriState  } : undefined} />
        </View>
      )}


      {/* Buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.retakebutton} onPress={navigateToCamera}>
          <Text style={styles.retakebuttonText}>Retake</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.nextbutton} onPress={navigateToReviewSummary}>
          <Text style={styles.buttonText}>Next</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
