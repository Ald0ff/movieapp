import React, { createContext, useState, useContext } from 'react';

// Crea un contexto para el tema
const ThemeContext = createContext();

// Define los estilos para los temas claro y oscuro
const lightTheme = {
    background: '#FFFFFF',
    text: '#000000',
    // ...otros estilos para el tema claro
};

const darkTheme = {
    background: '#000000',
    text: '#FFFFFF',
    // ...otros estilos para el tema oscuro
};

// Crea un proveedor del tema
export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState(lightTheme); // Inicia con el tema claro

    // Función para cambiar entre temas claro y oscuro
    const toggleTheme = () => {
        setTheme(theme === lightTheme ? darkTheme : lightTheme);
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

// Hook personalizado para usar el contexto del tema
export const useTheme = () => useContext(ThemeContext);

export default ThemeContext;
