import React, { useState } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import * as Crypto from 'expo-crypto';
import * as ImagePicker from 'expo-image-picker';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { View, TextInput, Button, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { saveMoviesData, updateMovieData } from '../../utils/dataUtils';

export default function FormMovie({ navigation, route }) {
    const isEditing = route.params?.isEditing || false;
    const movieToEdit = route.params?.movie;

    const [selectedImage, setSelectedImage] = useState(isEditing ? movieToEdit.portada : null);


    const initialValues = isEditing
        ? { ...movieToEdit }
        : { portada: '', titulo: '', descripcion: '', categorias: '' };

    const pickImageAsync = async (setFieldValue) => {
        let result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            quality: 1,
        });

        if (!result.canceled && result.assets) {
            const uri = result.assets[0].uri;
            setSelectedImage(uri);
            setFieldValue('portada', uri);
        } else {
            alert('No se seleccionó ninguna imagen.');
        }
    };

    const movieSchema = Yup.object().shape({
        portada: Yup.string().required('La imagen es requerida').required('Requerido'),
        titulo: Yup.string().required('Requerido'),
        descripcion: Yup.string().required('Requerido'),
        categorias: Yup.string().required('Requerido')
    });
    return (
        <KeyboardAwareScrollView
            keyboardShouldPersistTaps={'always'}
            style={{ flex: 1 }}
            showsVerticalScrollIndicator={true}
            behavior="padding" enabled>
            <Formik
                initialValues={initialValues}
                onSubmit={async (values) => {
                    console.log("Valores del formulario:", values);
                    if (isEditing) {
                        await updateMovieData(values);
                    } else {
                        const id = Crypto.randomUUID();
                        const movieWithId = { ...values, id: id };
                        await saveMoviesData([movieWithId]);
                    }
                    navigation.navigate('Home');
                }}
                validationSchema={movieSchema}
            >

                {({ handleChange, handleBlur, handleSubmit, values, errors, touched, setFieldValue }) => (
                    <View>
                        {selectedImage && (
                            <View style={styles.imageContainer}>
                                <Image source={{ uri: selectedImage }} style={styles.image} />
                            </View>
                        )}

                        <TouchableOpacity onPress={() => pickImageAsync(setFieldValue)} style={styles.btnImg}>
                            <Text>Seleccionar imagen</Text>
                        </TouchableOpacity>

                        {touched.portada && errors.portada ? (
                            <Text style={styles.error}>{errors.portada}</Text>
                        ) : null}

                        <TextInput
                            name="titulo"
                            style={styles.input}
                            onChangeText={handleChange('titulo')}
                            onBlur={() => handleBlur('titulo')}
                            value={values.titulo}
                            placeholder="Título"
                        />
                        {touched.titulo && errors.titulo ? (
                            <Text style={styles.error}>{errors.titulo}</Text>
                        ) : null}

                        <TextInput
                            name="descripcion"
                            style={styles.textarea}
                            onChangeText={handleChange('descripcion')}
                            onBlur={() => handleBlur('descripcion')}
                            value={values.descripcion}
                            placeholder="Descripcion"
                            multiline
                        />
                        {touched.descripcion && errors.descripcion ? (
                            <Text style={styles.error}>{errors.descripcion}</Text>
                        ) : null}

                        <TextInput
                            name='categorias'
                            style={styles.input}
                            onChangeText={handleChange('categorias')}
                            onBlur={() => handleBlur('categorias')}
                            value={values.categorias}
                            placeholder="Categorias"
                        />
                        {touched.categorias && errors.categorias ? (
                            <Text style={styles.error}>{errors.categorias}</Text>
                        ) : null}
                        <TouchableOpacity onPress={handleSubmit} style={styles.btn}>
                            <Text style={{color: "#fff"}}>
                                Agregar
                            </Text>
                        </TouchableOpacity>
                    </View>
                )}
            </Formik>
        </KeyboardAwareScrollView>
    )
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 10,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        paddingHorizontal: 10,
        color: "#000",
        width: 200
    },
    error: {
        color: 'red',
    },
    image: {
        width: 200,
        height: 200,
        marginBottom: 10,
        borderRadius: 5
    },
    imageContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    textarea: {
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        paddingHorizontal: 10,
        color: '#000',
        textAlignVertical: 'top',
        width: 200,
    },
    btn: { 
        marginBottom: 10,
        padding: 10,
        backgroundColor: "#79b7ac",
        width: 200,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center', 
        padding: 10,
        borderRadius: 5,
    },
}); 