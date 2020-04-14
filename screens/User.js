import React from 'react'
import {View, Text, Image} from 'react-native'
import serveraddress from '../config'

const formatDate = (dateobj) => {
    // Returns a nicely formatted date from sql timestamp
    var date = dateobj.split(" ")[0]
    var day = date.split("-")[2]
    var month = date.split("-")[1]
    var year = date.split("-")[0]
    date = `${day}-${month}-${year}`
    return `${date}`
}

class User extends React.Component{

    state = {
        name: "",
        email: "",
        username: "",
        date: "",
        count: 0,
        total: 0
    }

    componentDidMount(){
        // Fetches the User information
        fetch(`${serveraddress}/user.php`, {
            method: "POST",
            body: JSON.stringify({
                userid: this.props.route.params.userid
            })
        })
        .then((repsonse)=>repsonse.json())
        .then((json) => {
            this.setState({
                name: json.name,
                email: json.email,
                username: json.username,
                count: json.count,
                total: json.total,
                date: json.date
            })
        })
        .catch(error => console.log(error))
    }

    render(){
        return(
            <View style={{
                flex: 1,    
                flexDirection: "column", 
                backgroundColor: "#fff"}}
            >
                <View style={headerView}>
                    <Text style={headerText}>
                        Medkart
                    </Text>
                </View>
                <View style={{margin: 10, justifyContent: "center", alignItems: 'center', paddnig: 10}}>
                    <Image source={require(`../assets/avatar.png`)} style={{
                        borderRadius: 10,
                        margin: 20,
                        height: 250,
                        width: 250,
                        resizeMode: 'contain'
                    }}>
                    </Image>
                </View>
                <View style={{justifyContent: "center", alignItems: "center"}}>
                    <Text style={{fontSize: 36, fontWeight: "bold"}}>{this.state.name}</Text>
                    <Text style={{fontSize: 24}}>{this.state.email}</Text>
                    <View style={{...tileStyle, marginTop: 30}}>
                        <Text style={detailStyle}>Account created on
                        </Text>
                        <Text style={detailStyle}>{formatDate(this.state.date)}</Text>
                    </View>
                    <View style={tileStyle}>
                        <Text style={detailStyle}>Username</Text>
                        <Text style={detailStyle}>{this.state.username}</Text>
                    </View>
                    <View style={tileStyle}>
                        <Text style={detailStyle}>Number of Purchases</Text>
                        <Text style={detailStyle}>{this.state.count}</Text>
                    </View>
                    <View style={tileStyle}>
                        <Text style={detailStyle}>Total amount spent</Text>
                        <Text style={detailStyle}>Rs. {this.state.total}</Text>
                    </View>
                    </View>
                </View>
        )
    }
}

export default User

const headerView = {
    backgroundColor: "#1a54b0",
    height: '10%',
    height: 80,
    justifyContent: 'center',
    alignItems: 'center'
}

const headerText = {
    fontFamily: "Helvetica",
    fontSize: 32,
    fontWeight: "bold",
    textAlign: "center",
    color: "#fff"
}

const tileStyle = {
    width: '90%',
    backgroundColor: "#fff",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 15,
    margin: 15,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
}

const detailStyle = {
    fontSize: 18
}