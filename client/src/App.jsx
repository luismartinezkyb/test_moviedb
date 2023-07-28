
import Rutas from './routes/Routes';
import Navbar from './components/partials/Navbar';

function App() {
  

  return (
    <div className="App">
      <Navbar/>
      <Rutas/>
      
    </div>
  )
}

export default App
// Create a homepage that displays a list of popular movies fetched from the external API.
// - Each movie should display its title, release year, poster image, and a brief overview.
// - Implement a search functionality that allows users to search for movies by title.
// - Display search results dynamically as the user types in the search input.
// - Clicking on a movie should navigate to a details page showing additional information about
// the movie, such as the full overview, runtime, genres, and average rating.