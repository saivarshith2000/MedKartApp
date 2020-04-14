import React from 'react'
import {Text, TextInput, View} from 'react-native'

class FormInput extends React.Component{
    render(){
        let param = false;
        if(this.props.isPassword)
            param = true
        return (
            <View>
                <Text style={labelStyle} >
                {this.props.label}
                </Text>
                <TextInput
                    editable
                    maxLength={32}
                    style={formstyle}
                    placeholder={this.props.placeholder}
                    onChangeText={this.props.handleText}
                    secureTextEntry={param}
                >
                </TextInput>
            </View>
        );
    }
    
}

const formstyle = {
    borderRadius: 10,
    backgroundColor: "#d5e7ed",
    minWidth: "80%",
    fontSize: 18,
    padding: 10,
}

const labelStyle = {
    color: "#fff",
    fontFamily: "Helvetica",
    fontSize: 18,
    padding: 10,
    marginTop: 15
}

export default FormInput;