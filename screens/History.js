import React from 'react'
import {Text, View, TouchableOpacity, FlatList} from 'react-native'
import serveraddress from '../config'

const getFormattedDate = (dateobj) => {
    // returns a nicely formatted date-time string
    var date = dateobj.split(" ")[0]
    var day = date.split("-")[2]
    var month = date.split("-")[1]
    var year = date.split("-")[0]
    date = `${day}-${month}-${year}`
    var time = dateobj.split(" ")[1]
    var hour = time.split(":")[0]
    var minutes = time.split(":")[1]
    let mer = "AM"
    if (hour > 12){
        mer = "PM"
        hour -= 12
    }
    time = `${hour}:${minutes} ${mer}`
    return `On ${date} at ${time}`
}

const ListItem = (props) => {
    // the list item component
    return (
        <View style={{
            borderRadius: 10,
            padding: 15,
            backgroundColor: "#fff",
            shadowColor: "#000",
            shadowOpacity: 0.5,
            shadowRadius: 5,
            elevation: 5,
            margin: 15,
            marginBottom: 0 
        }}>
            <View style={{flexDirection: "row", alignItems: "center", justifyContent: "space-between"}}>
                <Text style={{ fontSize: 28}}>
                    {props.medname}
                </Text>
                <Text style={{ fontWeight: "bold", fontSize: 24 }}>
                    Rs. {props.price}
                </Text>
            </View>
            <Text style={{fontSize: 18}}>
                {getFormattedDate(props.date)}
            </Text>
        </View>
    );
}

class History extends React.Component {
    state = {
        results : []
    }
    componentDidMount(){
        // perform the api request here and save it in state,
        // After the component is loaded, the list is rendered
        fetch(`${serveraddress}/purchase.php`,{
            method: "POST",
            body: JSON.stringify({
                userid: this.props.route.params.userid
            })
        })
        .then((response) => response.json())
        .then((json_response) => {
            if(json_response.status){
                // the status key exists only if there was an error
                this.setState({error: "Unable to contact server"})
            } else {
                this.setState({ results: json_response })
            }
        })
        .catch((error) => { 
            console.log(error)
            this.setState({error: "Could Not contact the server !"})
            return 
        })
    }
    render(){
        let count = 0;
        let resultView = <View style={{flexDirection: "column", backgroundColor: "#fff", flex: 1}}>
            <FlatList
                data={this.state.results}            
                renderItem={({item}) => {
                    return <ListItem medname={item.medname} date={item.date} price={item.price}/>
                }}
                keyExtractor = {()=>{count++; return count.toString()}}
            />
            {/* {this.state.results.map((item) =>
                <ListItem medname={item.medname} date={item.date} price={item.price} key={count++} />
            )} */}
        </View>
        let errorView = <View style={{flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#c44829" }}>
            <Text style={{ fontSize: 32, color: "#fff" }}>
                Unable to contact server !
                </Text>
        </View>
        let torender = resultView
        if(this.state.results == null) torender = errorView
        return (
            <View style={{flex: 1, backgroundColor: "#fff"}}>
                <View style={headerView}>
                    <Text style={headerText}>
                        Medkart
                    </Text>
                </View>
                {torender}
                <TouchableOpacity style={{
                        borderRadius: 10,
                        backgroundColor: "#32a852",
                        padding: 10,
                        margin: 20,
                        justifyContent: "center",
                        alignItems: "center"
                    }}
                    onPress={()=>this.props.navigation.navigate("Home", {
                        usreid: this.props.route.params.userid,
                        username: this.props.route.params.username
                    })}
                >
                    <Text style={{ color: "#fff", fontSize: 20}}>Back to Store</Text>
                </TouchableOpacity>
            </View>
            
        )
    }
}

export default History


const headerView = {
    backgroundColor: "#1a54b0",
    height: '10%',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: "#000",
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 5,
}

const headerText = {
    fontFamily: "Helvetica",
    fontSize: 32,
    fontWeight: "bold",
    textAlign: "center",
    color: "#fff"
}