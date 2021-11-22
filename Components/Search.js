// Components/Search.js

import React from 'react'
import {StyleSheet, View, TextInput, Button, Text, FlatList} from 'react-native'
import films from "../Data/filmsData";
import FilmItem from "./FilmItem";

class Search extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            films: films,
            searchedText: "" // Initialisation de notre donnée searchedText dans le state
        }
    }

    searchTextInputChanged(text) {
        this.setState({searchedText: text})
        let filteredMovies = films.filter((item) => {
            return item.title.toLowerCase().match(text.toLowerCase())
        })
        this.setState({ films: filteredMovies })
    }

    resetSearch() {
        this.setState({ films: films, searchedText: ""})
    }

    render() {
        return (
            <View style={styles.main_container}>
                <View style={{flexDirection: "row"}}>
                    <TextInput
                        style={styles.text_input}
                        placeholder='Titre du film'
                        value={this.state.searchedText}
                        onChangeText={(text) => this.searchTextInputChanged(text)}
                    />
                    <Button title='Annuler' onPress={() => this.resetSearch()}/>
                </View>
                <FlatList
                    data={this.state.films}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({item}) => <FilmItem film={item}/>}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    main_container: {
        flex: 1,
        marginTop: 50
    },
    text_input: {
        flex: 1,
        marginLeft: 5,
        marginRight: 5,
        height: 50,
        borderColor: '#e8e8e8',
        backgroundColor: '#ecebeb',
        borderWidth: 1,
        paddingLeft: 5
    }
})

export default Search