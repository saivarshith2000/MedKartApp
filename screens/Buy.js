import React, {Component} from 'react'
import {Text, View, Image, TouchableOpacity} from 'react-native'
import serveraddress from '../config'

class Buy extends Component {

    buyPress = () => {
        // sends purchase data to server
        const item = this.props.route.params.item
        const username = this.props.route.params.username
        const id = this.props.route.params.userid
        fetch(`${serveraddress}/buy.php`, {
            method: "POST",
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'text/plain'
            },
            body : JSON.stringify({
                userid: id,
                itemid: item.id,
            })
        })
        .then((response) => {
            this.props.navigation.navigate("Confirm", {
                item,
                username,
                id
            })
            return ;
        })
        .catch((error) => {
            console.log(error)
        })
    }

    render(){
        const item = this.props.route.params.item
        return(
            <View style={{flex: 1, backgroundColor: "#fff"}}>
                <View style={headerView}>
                    <Text style={headerText}>
                        Medkart
                    </Text>
                </View>
                <View style={{ margin: 20, flex: 1 }}>
                    <View style={{ justfiyContent: "center", alignItems: "center"}}>
                        <Image source={require(`../assets/pills.png`)} style={imageStyle}/>
                    <Text style={mednameStyle}>
                        {item.medname}
                    </Text>
                    <Text style={priceStyle}>
                        Rs. {item.price}
                    </Text  >
                    </View>
                    <View style={{margin: 10, justifyContent: "center", alignItems: "center"}}>
                        <Text style={{ fontSize: 20 }}> Usage </Text>
                        <Text style={detailStyle}>
                            {item.description}
                        </Text>  
                    </View>
                    <View style={{ margin: 10, justifyContent: "center", alignItems: "center" }}>
                        <Text style={{ fontWeight: 'bold', fontSize: 20 }}> Side Effects </Text>
                        <Text style={detailStyle}>
                            {item.side_effects}
                        </Text>
                    </View>
                    <View style={{ margin: 10, justifyContent: "center", alignItems: "center" }}>
                        <Text style={{ fontWeight: 'bold', fontSize: 20 }}> Composition </Text>
                        <Text style={detailStyle}>
                            {item.drugname}
                        </Text>
                    </View>
                    
                </View>
                <View style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                    position: "absolute",
                    bottom: 10
                }}>
                    <TouchableOpacity
                        style={buttonStyle}
                        onPress={this.buyPress}>
                        <Text style={{ fontSize: 20, textAlign: "center", color: "white" }}>Buy Now</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

export default Buy

const headerView = {
    backgroundColor: "#1a54b0",
    height: '10%',
    justifyContent: 'center',
    alignItems: 'center',
}

const headerText = {
    fontFamily: "Helvetica",
    fontSize: 25,
    fontWeight: "bold",
    textAlign: "center",
    color: "#fff"
}

const imageStyle = {
    margin: 10,
    height: 200,
    width: 200
}

const mednameStyle = {
    fontFamily: "Helvetica",
    fontSize: 32,
    padding: 10
}

const priceStyle = {
    fontFamily: "Helvetica",
    fontSize: 28,
    padding: 10
}

const detailStyle = {
    fontFamily: "Helvetica",
    textAlign: "center",
    fontSize: 18,
    paddingTop: 10
}

const buttonStyle = {
    flex: 1,
    textAlign: "center",
    backgroundColor: "#32a852",
    borderRadius: 10,
    margin: 15,
    padding: 15,
}