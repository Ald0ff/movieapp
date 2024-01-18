import * as FileSystem from 'expo-file-system';

const fileName = 'movies.json';
const fileUri = FileSystem.documentDirectory + fileName;

export const saveMoviesData = async (movies) => {
    console.log("Guaradando movies", movies)
    try {
        let existingMovies = [];

        // Intenta leer los datos existentes
        try {
            const fileContents = await FileSystem.readAsStringAsync(fileUri);
            existingMovies = JSON.parse(fileContents);
        } catch (e) {
            // Si hay un error al leer o parsear, asume que no hay películas existentes
            console.error('Error al leer los datos existentes:', e);
        }

        // Verifica que existingMovies sea un array
        if (!Array.isArray(existingMovies)) {
            existingMovies = [];
        }

        // Si movies es un objeto único, conviértelo en un array
        const moviesArray = Array.isArray(movies) ? movies : [movies];

        // Combinar el array existente con el nuevo
        const updatedMovies = [...existingMovies, ...moviesArray];

        const jsonMovies = JSON.stringify(updatedMovies);
        await FileSystem.writeAsStringAsync(fileUri, jsonMovies);
    } catch (e) {
        console.error('Error al guardar los datos de las películas:', e);
        throw e;
    }
};

export const loadMoviesData = async () => {
    try {
        const fileContents = await FileSystem.readAsStringAsync(fileUri);
        return JSON.parse(fileContents);
    } catch (e) {
        console.error('Error al leer los datos de las películas:', e);
        return []; // Retorna un arreglo vacío si hay un error
    }
};

export const clearMoviesData = async () => {
    try {
        // Sobrescribe el archivo con un array vacío en formato JSON
        await FileSystem.writeAsStringAsync(fileUri, JSON.stringify([]));
        console.log('Datos de las películas vaciados con éxito.');
    } catch (e) {
        console.error('Error al vaciar los datos de las películas:', e);
        throw e;
    }
};

export const deleteMovie = async (movieId) => {
    try {
        // Cargar películas existentes
        const existingMovies = await loadMoviesData();

        // Filtrar la película que se va a eliminar
        const updatedMovies = existingMovies.filter(movie => movie.id !== movieId);

        // Guardar los datos actualizados
        await FileSystem.writeAsStringAsync(fileUri, JSON.stringify(updatedMovies));
        console.log(`Película con id ${movieId} eliminada con éxito.`);

        return updatedMovies; // Retorna las películas actualizadas
    } catch (e) {
        console.error('Error al eliminar la película:', e);
        throw e;
    }
};

export const updateMovieData = async (updatedMovie) => {
    const movies = await loadMoviesData();
    const updatedMovies = movies.map(movie => {
        if (movie.id === updatedMovie.id) {
            return updatedMovie;
        }
        return movie;
    });
    await FileSystem.writeAsStringAsync(fileUri, JSON.stringify(updatedMovies));
};