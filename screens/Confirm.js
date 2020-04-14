import React from 'react'
import {View, Text} from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'

class Confirm extends React.Component {
    render(){
        const item = this.props.route.params.item
        return(
            <View style={{ 
                    backgroundColor: "#32a852",
                    flex: 1,
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center", 
                    padding: 10,
                    textAlign: "center",
                }}>
                <Text style={{margin: 30, fontSize: 36, color: "#fff", textAlign: "center"}}>Purchased {item.medname}!</Text>
                <Text style={{ margin: 20, fontSize: 28, color: "#fff", textAlign: "center"}}>Product shipped !!</Text>
                <Text style={{ margin: 30, fontSize: 24, color: "#fff", textAlign: "center" }}>
                    Please keep Rs. {item.price} handy at the time of delivery and maintain social distancing !
                </Text>
                <TouchableOpacity style={{
                    borderRadius: 10,
                    backgroundColor: "#fff",
                    padding: 20,
                    marginTop: 50,
                    paddingLeft: 30,
                    paddingRight: 30,
                }}
                onPress={() => {
                    // Go back to store page on pressing this button
                    this.props.navigation.navigate("Home", {
                        username: this.props.route.params.username,
                        id: this.props.route.params.id,
                    })
                }}
                >
                <Text style={{
                    color: "#32a852",
                    fontSize: 24,
                }}>
                    Back to store !
                </Text>
                </TouchableOpacity>
            </View>
        )
    }
}

export default Confirm