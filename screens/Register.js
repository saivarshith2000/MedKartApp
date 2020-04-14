import React from 'react'
import { View, Text, TouchableOpacity, ToastAndroid } from 'react-native'
import FormInput from '../components/formInput'
import serveraddress from '../config'

class Register extends React.Component {
    state = {
        username: '',
        password: '',
        email: '',
        error: this.props.error
    }

    handleUsername = (username) => { this.setState({ username, error: "" }) }
    handlePassword = (password) => { this.setState({ password, error: "" }) }
    handleEmail = (email) => { this.setState({ email, error: "" }) }
    handleName = (name) => { this.setState({ name, error: "" }) }

    submitRegister = () => {
        // handles the form validation and POST request
        if (this.state.username === '') {
            // if username is empty
            this.setState({ error: "Username must not be empty" });
            return;
        }
        if (this.state.email === '') {
            // if password is empty
            this.setState({ error: "Email must not be empty" });
            return;
        }
        if (this.state.password === '') {
            // if password is empty
            this.setState({ error: "Password must not be empty" });
            return;
        }
        // if there are not errors, send a post request
        return fetch(`${serveraddress}/register.php`, {
        // return fetch("http://10.0.2.2/medkart/api/register.php", {
            method: 'POST',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'text/plain'
            },
            body: JSON.stringify({
                name: this.state.name,
                username: this.state.username,
                email: this.state.email,
                password: this.state.password,
            })
        })
            .then((response) => response.json())
            .then((json) => {
                if (json["status"] == "success") {
                    ToastAndroid.showWithGravity(
                        "Registration Successful ! Login to continue :)",
                        ToastAndroid.LONG,
                        ToastAndroid.BOTTOM
                    );
                    this.props.navigation.navigate("Login");
                    return;
                } else {
                    this.setState({ error: json["msg"] })
                    return ;
                }
            })
            .catch((error) => {
                this.setState({error: "Unable to contact server"});
                return ;
            })
    }

    render() {
        let error;
        let bgColor = "#1a54b0"
        if (this.state.error) {
            error = <Text style={errorstyle}>{this.state.error}</Text>;
            bgColor = "#a1253a"
        }
        return (
            <View style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: bgColor
            }}>
                <Text
                    style={{
                        color: "#fff",
                        fontFamily: "Helvetica",
                        fontSize: 64,
                        padding: 10
                    }}>
                    Register
            </Text>
                {/* Errors */}
                {error}
                {/* Form Inputs*/}
                <FormInput label="Name" placeholder="Enter your name" handleText={this.handleName} />
                <FormInput label="Username" placeholder="Select your username" handleText={this.handleUsername} />
                <FormInput label="Email" placeholder="Enter your email address" handleText={this.handleEmail} />
                <FormInput label="Password" placeholder="Choose a secure password" handleText={this.handlePassword} isPassword={true} />
                {/* Register Button */}
                <TouchableOpacity onPress={() => this.submitRegister()} >
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
                        Register
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

export default Register;