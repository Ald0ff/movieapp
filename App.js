
import React from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import TabNavigation from './src/navigation/Navigation';
import MoviesDetails from './src/screens/MovieDetails';
import AddMovie from './src/screens/AddMovie';

const Stack = createStackNavigator();

function App() {
    return (
        <NavigationContainer>
            <StatusBar
                animated={true}
                backgroundColor="#79b7ac"
                barStyle={'light-content'}
                //showHideTransition={statusBarTransition}
                //hidden={hidden}
            />
            <Stack.Navigator
                screenOptions={{
                    headerStyle: {
                        backgroundColor: '#79b7ac', // Cambia el color de fondo de la cabecera aquí
                    },
                    headerTintColor: '#fff', // Cambia el color del texto de la cabecera si es necesario
                }}
            >
                <Stack.Screen
                    name="Home"
                    component={TabNavigation}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="AddMovie"
                    component={AddMovie}
                    options={{ title: 'Agregar Película' }}
                />
                <Stack.Screen
                    name="MovieDetails"
                    component={MoviesDetails}
                    options={{ title: 'Detalles' }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default App;
