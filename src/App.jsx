import React, { useEffect, useState } from 'react'
import Search from './components/Search.jsx'
import Spinner from './components/Spinner.jsx'
import './App.css'
import MovieCard from './components/MovieCard.jsx';

const API_BASE_URL = "https://api.themoviedb.org/3";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const API_OPTIONS = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: `Bearer ${API_KEY}`
    }
};


const App = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [movieList, setMovieList] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const fetchMovies = async (query = '') =>{
        setIsLoading(false);
        setErrorMessage('');

        try {
            const endpoint = query 
            ? `${API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}`
            : `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`

            const response = await fetch(endpoint, API_OPTIONS);

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            console.log(data);

            if(data.Response == 'False'){
                setErrorMessage(data.Error || 'Failed to fetch movies.');
                setMovieList([]);
                return;
            }

            setMovieList(data.results || []);

        } catch (error) {
            console.error("Error fetching movies:", error);
            setErrorMessage("Failed to fetch movies. Please try again later.");
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        fetchMovies(searchTerm);
    }, [searchTerm])
    
    return (
        <main>
            <div className='pattern'/>

            <div className="wrapper">
                <header>
                    <img src="./hero.png"></img>
                    <h1 className="text-3xl font-bold">
                        Find <span className="text-gradient">Movies</span> you'll enjoy without the hassle
                    </h1>
                <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>
                </header>

                <section>
                    <h2 className="mt-[20px]">All Movies</h2>
        
                    {isLoading ? (
                        <Spinner />
                    ) : errorMessage? (
                        <p className="text-red-500">{errorMessage}</p>
                    ) : (
                        <ul>
                            {movieList.map((movie) => (
                                <MovieCard key={movie.id} movie={movie} />
                            ))}
                        </ul>
                    )}
                    {errorMessage && <p className="text-red-500">{errorMessage}</p>}
                </section>
            </div>
            
        </main>
    )
}



export default App
