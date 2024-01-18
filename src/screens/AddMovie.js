import React from 'react';
import {  StyleSheet} from 'react-native';
import FormMovie from '../components/FormMovie';
import Layout from '../components/Layout';


const AddMovie = ({ navigation, route }) => {

    return (
        <Layout style={styles.container}>

            <FormMovie navigation={navigation}  route={route} />
            
        </Layout>
    );
};

export default AddMovie;
const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 30
    },
    imageContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});