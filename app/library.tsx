// pages/library.tsx
import React from 'react';
import { View, Text, StyleSheet,SafeAreaView, TouchableOpacity, TextInput } from 'react-native';
import BottomNavigation from '../components/bottomNav';
import { router } from 'expo-router';


const LibraryScreen: React.FC = () => {



    const navigateToAddProcedure = () => {
        router.push("addProcedure");
      }

    return (
    <SafeAreaView style={styles.container}> 
        <View style={styles.container}>
            <Text style={styles.title}>DR. CRAIG CLARK</Text>
            <Text style={styles.subtitle}>Procedures Library</Text>
            <Text style={styles.description}>
                On this screen you create or edit your medical procedures practices. 
                Then you will add your pictures.
            </Text>
            <View style={styles.card}>
                {/* 
                //MG 
                //Add Procedure */}
                <TouchableOpacity style={styles.addButton} onPress={navigateToAddProcedure}>
                    <Text style={styles.addProcedureButtonText}>Add Procedure   +</Text>
                </TouchableOpacity>
                {/* 
                //MG 
                //Procedure Name*/}
                <TouchableOpacity style = {styles.input}>
                    <Text style={styles.procedureNameButtonText}>Procedure Name</Text>
                    <Text style={styles.arrow}>{'>'}</Text>
                    </TouchableOpacity>
                {/* 
                //MG 
                //Finish */}
                <TouchableOpacity style={styles.finishButton}>
                    <Text style={styles.FinishButtonText}>Finish Demo</Text>
                </TouchableOpacity>
            </View>
            
        </View>
            <BottomNavigation/>
        </SafeAreaView>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#E7EFFF',
    },
    navItem: {
        alignItems: 'center'
    },
    FinishButtonText: {
        color: '#3A5A8C',
        fontSize: 18, // Adjusted font size
        fontWeight: 'bold',
    },
    addProcedureButtonText: {
        color: '#ffffff',
        fontSize: 18, // Adjusted font size
        fontWeight: 'bold',
    },
    procedureNameButtonText: {
        color: 'black',
        fontSize: 18, // Adjusted font size
        
    },
    arrow: {
        color: '#4A6FA5', // Arrow color
        fontSize: 20, // Adjust arrow size as needed
    },
    card: {
        width: '100%', // or maxWidth: 400
        maxWidth: 400,
        height: 430, // Adjust height as needed
        backgroundColor: '#ffffff',
        borderRadius: 10,
        padding: 20, // Padding for inner content
        borderWidth: 2, // Add border
        borderColor: 'white', // Border color
        shadowColor: '#000', // Shadow for iOS
        shadowOpacity: 0.1,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: 2 },
    },
    bottomNav: {
        width: '100%', // or maxWidth: 400
        maxWidth: 400,
        height: 500, // Adjust height as needed
        backgroundColor: '#ffffff',
        borderRadius: 10,
        padding: 20, // Padding for inner content
        borderWidth: 2, // Add border
        borderColor: 'white', // Border color
        shadowColor: '#000', // Shadow for iOS
        shadowOpacity: 0.1,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: 2 },
    },
    title: {
        justifyContent: "center",
        alignItems: "center",
        fontSize: 13,
        marginBottom: 5,
        color: '#4A6FA5',
        textAlign: 'center',
        fontFamily: 'Roboto',

    },
    subtitle: {
        fontSize: 45,
        marginBottom: 10,
        textAlign: 'center',
        fontFamily: 'Roboto',


    },
    description: {
        marginBottom: 20,
        fontSize: 17,
        lineHeight: 24,
        textAlign: 'center',
        width: 307,
        height: 67,
        fontFamily: 'Darker Grotesque',
    },
    addButton: {
        backgroundColor: '#375894',
        color: 'white',
        padding: 15,
        borderRadius: 30,
        alignItems: 'center',
        marginBottom: 10,
        
    },
    input: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between', // Align text and arrow
        width: '100%',
        maxWidth: 400,
        padding: 15,
        borderWidth: 1,
        borderColor: '#4A6FA5',
        borderRadius: 10,
        backgroundColor: '#ffffff',
        marginBottom: 20,
        shadowColor: '#4A6FA5',
    },
    finishButton: {
        backgroundColor: 'white',
        color: 'white',
        padding: 15,
        borderRadius: 30,
        alignItems: 'center',
        position: "absolute",
        bottom: 30,
        left: 20,
        right: 20,
        borderColor: "#3A5A8C",
        borderWidth: 2,
        
    },
});

export default LibraryScreen;