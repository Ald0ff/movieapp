import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import MoviesList from '../screens/MovieList';
import AddMovie from '../screens/AddMovie';
import { FontAwesome5 } from "@expo/vector-icons";
import HeaderTitleWithIcon from '../components/HeaderTitleWithIcon';


const Tab = createBottomTabNavigator();

export default function Navigation() {
    return (
        <Tab.Navigator
        screenOptions={{
            tabBarStyle: {
                backgroundColor: '#79b7ac', 
            },
            tabBarActiveTintColor: '#fff', 
        }}>
            <Tab.Screen
                name="Peliculas"
                component={MoviesList}
                options={{
                    headerStyle: { backgroundColor: '#79b7ac' },
                    headerTintColor: '#fff',
                    tabBarLabel: "",
                    tabBarIcon: ({ color, size }) => (
                        <FontAwesome5
                            name="home"
                            size={size}
                            color={color}
                        />
                    ),
                    headerTitle: () => <HeaderTitleWithIcon />
                }} />
            <Tab.Screen
                name="Agregar"
                component={AddMovie}
                options={{
                    headerStyle: { backgroundColor: '#79b7ac' },
                    headerTintColor: '#fff',
                    tabBarLabel: "",
                    tabBarIcon: ({ color, size }) => (
                        <FontAwesome5
                            name="plus"
                            size={size}
                            color={color}
                        />
                    )
                }}
            />
        </Tab.Navigator>
    )
}
