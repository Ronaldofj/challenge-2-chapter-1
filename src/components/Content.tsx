import { useState, useEffect } from 'react'

import { MovieCard } from './MovieCard';
import { Header } from './Header';

import { api } from '../services/api';

import '../styles/content.scss';

interface MovieCardProps {
  selectedGenreId: number;
}

export function Content({ selectedGenreId }: MovieCardProps) {
  const [movies, setMovies] = useState<MovieProps[]>([]);

  useEffect(() => {
    api.get<MovieProps[]>(`movies/?Genre_id=${selectedGenreId}`).then(response => {
      setMovies(response.data);
    });
  }, [selectedGenreId]);

  return (
    <div className="container">
      <Header selectedGenreId={selectedGenreId} />

      <main>
        <div className="movies-list">
          {movies.map(movie => (
            <MovieCard key ={movie.imdbID} title={movie.Title} poster={movie.Poster} runtime={movie.Runtime} rating={movie.Ratings[0].Value} />
          ))}
        </div>
      </main>
    </div>
  )
}