import React, { useState } from 'react'
import Search from './components/Search.jsx'
import './App.css'

const App = () => {
    const [searchTerm, setSearchTerm] = useState('');
    
    return (
        <main>
            <div className='pattern'/>

            <div className="wrapper">
                <header>
                    <img src="./hero.png"></img>
                    <h1 className="text-3xl font-bold">
                        Find <span className="text-gradient">Movies</span> you'll enjoy without the hassle
                    </h1>
                </header>

                <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>
            </div>
            
        </main>
    )
}



export default App
