// ThemeToggleButton.js
import React, { useContext } from 'react';
import { TouchableOpacity, Text } from 'react-native';
import ThemeContext from './ThemeContext';
import { useTheme } from './ThemeContext';

const ThemeToggleButton = () => {
    const { toggleTheme } = useTheme();

    return (
        <TouchableOpacity onPress={toggleTheme} style={{ marginRight: 10, }}>
        <Text style={{ color: '#fff' }}>Cambiar Tema</Text>
    </TouchableOpacity>
    );
};

export default ThemeToggleButton;
