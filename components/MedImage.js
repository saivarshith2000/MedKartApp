import React from 'react'
import {Image} from 'react-native'

export default MedImage = (img) => {
    // returns an image element based on img name
    return <Image source={require("../assets/pills.png")} style={imgStyle}/>
}

const imgStyle={
    height: 80,
    width: 90,
    resizeMode: "contain",
    margin: 10
}