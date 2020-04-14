import React from 'react';
import { View, Text, TextInput, TouchableOpacity} from 'react-native';
import MedListItem from '../components/MedListItem';
import serveraddress from '../config'
import { FlatList } from 'react-native-gesture-handler';

class Home extends React.Component {

    state = {
        searchTerm: '',
        results: [],
        frameTerm: "Search Results appear here",
    }

    handleInput = (searchTerm) => {
        this.setState({
            searchTerm,
            results: [],
            frameTerm: "Search Results appear here"
        })
    }

    ItemPress = (item) => {
        // Handles list item press
        this.props.navigation.navigate("Buy", {
            item: item,
            userid: this.props.route.params.id,
            username: this.props.route.params.username
        })
    }

    handleSearch = () => {
        // handles the search button click event.
        if (this.state.searchTerm == '')return ;    // do nothing if searchbar is empty
        fetch(`${serveraddress}/search.php?medname=${this.state.searchTerm}`, {
            method: 'GET'
        })
        .then((response) => response.json())
        .then((json_response) => {
            this.setState({results: json_response})
        })
        .catch((error)=>{
            console.log(error);
            this.setState({frameTerm: "Couldn't contact server !"})
            return ;
        })
    }

    render() {
        let emptySearch = <Text style={emptyStyle}>{this.state.frameTerm}</Text>;
        let resultFrame;
        if (this.state.results.length) {
            resultFrame = <View style={{flex :1}}>
                <FlatList
                    data={this.state.results}
                    renderItem = {({item})=>{
                        return <MedListItem
                            key={item.id}
                            img="pills.png"
                            medname={item.medname}
                            compname={item.compname}
                            price={item.price}
                            side_effects={item.side_effects}
                            description={item.description}
                            ItemPress={() => this.ItemPress(item)} />
                    }}
                    contentContainerStyle={{ flexGrow: 1 }}
                    keyExtractor={(item)=>item.id}
                />
            </View>
        }
        else resultFrame = emptySearch;
        return(
            <View style={{flexDirection: 'column', flex: 1, backgroundColor: "#fff"}}>
                <View style={headerView}>
                    <Text style={headerText}>
                        Medkart
                    </Text>
                </View>
                    <View style={searchBarStyle}>
                    <TextInput 
                        style={inputStyle}
                        onChangeText={this.handleInput}
                        placeholder="Search meds">
                    </TextInput>
                    <TouchableOpacity style={searchButtonStyle} onPress={this.handleSearch}>
                        <Text style={{ fontSize: 20, color: "#fff"}}>Search</Text>
                    </TouchableOpacity>
                </View>
                {resultFrame}
                <View style={bottomBarStyle}>
                    <TouchableOpacity style={bottomButtonStyle} onPress={() => {
                        // navigate to purchase history screen
                        this.props.navigation.navigate("History", {
                            userid: this.props.route.params.id,
                            username: this.props.route.params.username
                        })
                    }}>
                        <Text style={{ color: "#fff", fontSize: 18 }}>Purchase History</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{...bottomButtonStyle, borderLeftColor: "#aaf", borderLeftWidth: 1}} onPress={()=>{
                        // navigate to purchase history screen
                        this.props.navigation.navigate("User", {
                            userid: this.props.route.params.id,
                        })
                    }}>
                        <Text style={{color: "#fff", fontSize: 18}}>Profile</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const searchBarStyle = {
    flexDirection: "row",
    margin: 15,
    alignItems: "center"
}


const inputStyle = {
    padding: 10,
    flex: 1,
    fontSize: 20,
    backgroundColor: "#ddd",
    borderRadius: 10
}

const searchButtonStyle = {
    marginLeft: 10,
    padding: 10,
    backgroundColor: "#1a54b0",
    borderRadius: 10,
}


const bottomBarStyle = {
    flexDirection: "row",
    position: "absolute",
    bottom: 0,
    backgroundColor: "#1a54b0"
}

const bottomButtonStyle = {
    flex: 1,
    margin: 5,
    padding: 15,
    justifyContent: "center",
    alignItems: "center"
}

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

const emptyStyle = {
    fontSize: 50,
    color: "#979797",
    textAlign: "center",
    margin: 20,
    marginTop: 200
}

export default Home;