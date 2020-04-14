import React from 'react';
import { View, Text, TouchableOpacity, ToastAndroid } from 'react-native';
import FormInput from '../components/formInput'
import serveraddress from '../config'

class Login extends React.Component {
    state = {
        username: '',
        password: '',
        error: this.props.error
    }

    handleUsername = (username) => {this.setState({username, error:""})}
    handlePassword = (password) => { this.setState({ password, error: ""})}

    submitLogin = () => {
        // handles the form validation and POST request
        if (this.state.username === ''){
            // if username is empty
            this.setState({error: "Username must not be empty"});
            return ;
        }
        if (this.state.password === ''){
            // if password is empty
            this.setState({ error: "Password must not be empty" });
            return ;
        }
        // if there are not errors, send a post request
        console.log(`Link : ${serveraddress}/login.php`)
        return fetch(`${serveraddress}/login.php`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'text/plain'
            },
            body: JSON.stringify({
                username: this.state.username,
                password: this.state.password
            })
        })
        .then((response) => response.json())
        .then((json_response) => {
            if (json_response["status"] == "success"){
                ToastAndroid.showWithGravity(
                    "Login Successful !",
                    ToastAndroid.LONG,
                    ToastAndroid.BOTTOM
                );
                this.props.navigation.navigate("Home", {
                    username: this.state.username,
                    id: json_response["id"]
                })
                return; 
            } else {
                this.setState({error: json_response["msg"]})
                return ;
            }
        })
        .catch((error)=>{
            console.log(error)
            this.setState({error: "Unable to contact server"});
            return ;
        })
    }

    render(){
        let error;
        let bgColor = "#1a54b0"
        if(this.state.error){
            error = <Text style={errorstyle}>{this.state.error}</Text>;
            bgColor = "#a1253a"
        }
        return(
            <View style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: bgColor
            }}>
            <Text
                style={{
                    fontSize: 64,
                    color: "#fff",
                    fontFamily: "Helvetica",
                    padding: 10
                }}>
                Login
            </Text>
            {/* Errors */}
            {error}
            {/* Form Inputs*/}
            <FormInput label="Username" placeholder="Enter your Username" handleText={this.handleUsername}/>
            <FormInput label="Password" placeholder="Enter your Password" handleText={this.handlePassword} isPassword={true}/>
            {/* Register Button */}
            <TouchableOpacity onPress={()=>this.submitLogin()} >
                <Text
                    style={{
                        fontSize: 24,
                        marginTop: 120,
                        padding: 15,
                        borderRadius: 5,
                        color: "white",
                        backgroundColor: "#32a852"
                        
                    }}
                >
                    Login
                </Text>
            </TouchableOpacity>
            </View>
        );
    }
}
const errorstyle = {
    color: "white",
    margin: 10,
    padding: 5,
    fontSize: 16,
    borderRadius: 10
}

export default Login;