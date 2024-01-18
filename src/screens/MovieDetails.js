import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Alert, Image, ScrollView } from 'react-native';
import { deleteMovie } from '../../utils/dataUtils';
import { FontAwesome5 } from "@expo/vector-icons";
import Layout from '../components/Layout';


const MoviesDetails = ({ route, navigation }) => {
    const { movie } = route.params;

    const handleDeleteMovie = async () => {
        try {
            await deleteMovie(movie.id);
            navigation.goBack();
        } catch (error) {
            console.error('Error al eliminar la película:', error);
        }
    };

    const handleDeleteConfirmation = () => {
        Alert.alert(
            "Eliminar Película",
            "¿Estás seguro de que quieres eliminar esta película?",
            [
                {
                    text: "Cancelar",
                    onPress: () => console.log("Cancelado"),
                    style: "cancel"
                },
                { 
                    text: "Eliminar", 
                    onPress: () => handleDeleteMovie() // Llama a la función asíncrona
                }
            ]
        );
    };

    return (

        <Layout style={{ padding: 10,  }}>
            <ScrollView>

                <View style={{position: 'relative'}}>
                    {movie.portada && (
                        <Image
                            source={{ uri: movie.portada }}
                            style={styles.image}
                        />
                    )}
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity onPress={handleDeleteConfirmation}>
                            <FontAwesome5 name="trash" size={18} color="#ff5252" />
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => navigation.navigate('AddMovie', { movie: movie, isEditing: true })}
                        >
                            <FontAwesome5 name="pen" size={18} color="#007bff" />
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.container}>
                    <Text style={[styles.titulo, styles.text]}>{movie.titulo}</Text>
                    <Text style={[styles.text, styles.textCategorias]}> {movie.categorias}</Text>                    
                    <Text style={styles.textDescripcion}> {movie.descripcion}</Text>
                </View> 
            </ScrollView>
        </Layout>
    );
};

export default MoviesDetails;
const styles = StyleSheet.create({
    image: {
        width: "100%",
        height: 500,
        resizeMode: 'cover',
        borderRadius: 20,
    },
    titulo: {
        fontSize: 25,
        fontWeight: '500'
    },
    buttonBorrar: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#ff5252',
        padding: 10,
        borderRadius: 5,
        width: 100
    },
    buttonEdit: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#007bff',
        padding: 10,
        borderRadius: 5,
        width: 100
    },
    buttonText: {
        color: '#25292e',
        marginLeft: 10,
    },
    buttonContainer: {
        flexDirection: 'row',
        gap: 20,
        marginTop: 20,
        position: 'absolute',
        bottom: 20,
        right: 20,
        backgroundColor: '#00000050',
        borderRadius: 50,
        padding: 7
    },
    container: {
        backgroundColor: '#79b7ac',
        padding: 20, 
        borderRadius: 20,
        marginVertical: 20,
    },
    text: {
        color: "#fff"
    },
    textDescripcion: {
        color: "#f2f2f2"
    },
    textCategorias: {
        color: "#f2f2f2",
        fontSize: 17,
        marginVertical: 5,
        fontWeight: '500'
    }
});