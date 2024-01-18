import React, { useState,  useCallback } from 'react';
import { StyleSheet, View,   FlatList, Text, Image, TouchableOpacity } from 'react-native';
import { loadMoviesData  } from '../../utils/dataUtils';
import { useFocusEffect } from '@react-navigation/native';
import Layout from '../components/Layout';

const MoviesList = ({ navigation }) => {
    const [movies, setMovies] = useState([]);

    useFocusEffect(
        useCallback(() => {
            async function fetchMovies() {
                const loadedMovies = await loadMoviesData();
                console.log("peliculas cargadas: ", loadedMovies);
                setMovies(loadedMovies);
            }
            fetchMovies();
        }, [])
    );

    return (

        <Layout
            style={styles.container}
        >
            {!movies ? <Text style={{color: '#fff'}}>no hay Peliculas</Text>: (
                <FlatList
                data={movies}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => {
                    return (
                        <TouchableOpacity
                            onPress={() => navigation.navigate('MovieDetails', { movie: item })}
                        >
                            <View style={styles.card}>
                                {item.portada && (
                                    <Image
                                        source={{ uri: item.portada }}
                                        style={styles.image}
                                    />
                                )}
                            </View>
                        </TouchableOpacity>
                    );
                }}
                numColumns={2}
                columnWrapperStyle={styles.row}
            />
            )}
        </Layout>
    );
};

export default MoviesList;
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    card: {
        width: 190,
        height: 260,  
        margin: 5,
        alignItems: 'center'
    },
    row: {
        flex: 1,
        justifyContent: 'space-around', // Asegura el espacio alrededor de los elementos en una fila
    },
    titulo: {
        fontSize: 25,
        fontWeight: '500'
    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
        borderRadius: 5,
    },
});