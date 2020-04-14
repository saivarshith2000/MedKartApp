import React from 'react';
import { Text, View, TouchableOpacity, StatusBar} from 'react-native';

function Intro({navigation}){
    return (
        <View style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#1a54b0"
        }}>
            <StatusBar hidden />

            <Text style={{
                fontSize: 64,
                fontFamily: "Helvetica",
                color: "#fff"
            }}>
                Medkart
        </Text>
            <Text style={{
                fontSize: 16,
                fontFamily: "Helvetica",
                color: "#fff"
            }}>
                Welcome, Please login to continue
        </Text>
        {/* Login button */}
            <TouchableOpacity
                onPress={() => { navigation.navigate('Login') }}
                >
                    <Text
                        style={{
                            fontSize: 24,
                            marginTop: 120,
                            padding: 10,
                            borderRadius: 5,
                            color: "white",
                            backgroundColor: "#32a852",
                        }}
                    >
                        Log in
                </Text>
                </TouchableOpacity>
        
        {/* Register button */}
            <TouchableOpacity
                onPress={() => { navigation.navigate('Register') }}
            >
                <Text
                    style={{
                        fontSize: 14,
                        marginTop: 50,
                        padding: 10,
                        color: "#fff",
                        textDecorationLine: 'underline',
                    }}
                >
                    Don't have an account ? Register Now !
        </Text>
            </TouchableOpacity>
        </View>
    )
}

export default Intro;