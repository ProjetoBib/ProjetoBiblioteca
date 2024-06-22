import { StyleSheet, View, Text, TouchableOpacity, Dimensions, Animated, TextInput, ScrollView } from 'react-native';
import React, { useRef, useState } from 'react';
import { SearchBar, Card } from 'react-native-elements';

export default function Search() {
    const [search, setSearch] = useState('');

    const updateSearch = (search) => {
        setSearch(search);
    };
    return (
        <>
            <View style={styles.container}>
                <View style={styles.header}>
                    <SearchBar
                        placeholder='Busque o livro que deseja...'
                        onChangeText={updateSearch}
                        value={search}
                        lightTheme
                        round
                        containerStyle={styles.searchBarContainer}
                        inputContainerStyle={styles.searchBarInputContainer}
                    />
                </View>
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        marginTop: '10%',
        backgroundColor: '#3A89FF'
    },
    header: {
        backgroundColor: '#3A89FF',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: '2%',
        paddingHorizontal: '2%',
    },
    searchBarContainer: {
        backgroundColor: '#3A89FF',
        borderBottomColor: 'transparent',
        borderTopColor: 'transparent',
        flex: 1,
    },
    searchBarInputContainer: {
        backgroundColor: 'white',
    }
});
