import React from 'react'
import { View, Text, TouchableOpacity} from 'react-native'
import MedImage from './MedImage'

export default MedListItem = (props) => {
    return (
        <View style={ListItemStyle}>
            <TouchableOpacity style={{ flexDirection: "row"}} onPress={props.ItemPress}>
                <MedImage img={props.img}/>
                <View style={DetailStyle}>
                    <Text style={TitleStyle}>
                        {props.medname}
                    </Text>
                    <Text style={compnameStyle}>
                        By {props.compname}
                    </Text>
                    <Text style={PriceStyle}>
                        Rs. {props.price}
                    </Text>
                </View>
            </TouchableOpacity>
        </View>
    );
}

const ListItemStyle = {
    height: 100,
    borderRadius: 10,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 15,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 5,
}

const DetailStyle = {
    flexDirection: "column",
    margin: 10
}

const TitleStyle = {
    fontFamily: "Helvetica",
    fontSize: 20
}

const compnameStyle = {
    fontFamily: "Helvetica",
    color: "#979797",
    fontSize: 16,
}

const PriceStyle = {
    fontFamily: "Helvetica",
    fontSize: 18,
    fontWeight: "bold"
}