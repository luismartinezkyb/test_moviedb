import {useState, useEffect} from 'react'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom';
import no_image from '../assets/no_image.jpg'
import { ToastContainer } from 'react-toastify';
import { generateError } from '../utils/errors/alerts';
import Loader from '../components/partials/Loader';
import styles from '../style';

export default function MovieDetail() {
  const URL_API = import.meta.env.VITE_URL_API;
  const PATH_IMG = import.meta.env.VITE_PATH_IMG;
  const [movie, setMovie]=useState({})
  const [loading, setLoading] = useState(true);
  const [backdrop, setBackdrop] = useState(true)

  const navigate = useNavigate();
  const {id} = useParams();

  const onCancel = ()=>{
    navigate(-1);
  }

  const handleImageLoad = () => {
      setLoading(false);
  };

  const handleImageBackdrop = () => {
      setBackdrop(false)
  };


  const badges= [
    "bg-blue-100 text-blue-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded ",
    "bg-red-100 text-red-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded ",
    "bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded ",
    "bg-yellow-100 text-yellow-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded ",
    "bg-indigo-100 text-indigo-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded ",
    "bg-purple-100 text-purple-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded ",
    "bg-pink-100 text-pink-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded ",
    "bg-gray-100 text-gray-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded ",
    "bg-black- text-white text-xs font-medium mr-2 px-2.5 py-0.5 rounded ",
  ]

  useEffect(()=>{
    if(isNaN(parseInt(id))){
      navigate('/error');
      return;
    }
    axios.get(`${URL_API}api/movies/id/${id}`).then(function(response) {
      setMovie(response.data);
    }).catch(function(e){
      generateError('Something went wrong with the request')
    });
    
  },[])


  return (
    <>
      {Object.keys(movie).length!==0 ?
        <>
          {
              movie.backdrop_path &&
              <div className='absolute -z-10 w-full'>
              <img 
              src={`${PATH_IMG}${movie.backdrop_path}`} 
              alt={movie.original_title} 
              className=' object-cover opacity-80'
              style={{ display: backdrop ? 'none' : 'block', width: '100%', height: '100%' }}
              onLoad={handleImageBackdrop}
                />
            </div>
            
          }
          
          <div className='select-none  uppercase  transition-all hover:scale-105 focus:scale-105 focus:opacity-[0.85] active:scale-100 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none mt-3 absolute p-4 ml-4  flex flex-row gap-1 text-white bg-black bg-opacity-40 rounded-xl hover:text-black hover:cursor-pointer' onClick={onCancel}  >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
              </svg>
              
          </div>
          
              
          
          {backdrop && <Loader/>}
          <div className="mt-[30px] sm:mt-[100px] md:mt-[150px] xl:mt-[100px] flex flex-col justify-center items-center md:gap-10  md:flex-row p-4 rounded-lg">
            <div className="w-[200px] xl:w-[350px] sm:w-[250px] md:w-[300px] ">
              <img
                src={`${PATH_IMG}${movie.poster_path}`}
                alt={movie.title}
                className="w-full h-auto rounded-lg shadow-md"
                style={{ display: loading ? 'none' : 'block', width: '100%', height: '100%' }}
                onLoad={handleImageLoad}
              />
              {loading &&
                  <img
                  src={no_image}
                  alt={movie.title}
                  className="w-full h-auto rounded-lg shadow-md"
                  
                  />
              }
                    
            </div>
            <div className="md:w-1/2 md:pl-4 md:bg-gray-200 md:bg-opacity-80 rounded-xl p-9 shadow-xl border-b-2">
              <div className="relative group/ball">
                <div className='bg-gray-400 absolute top-0 right-0 -mr-10 -mt-1 z-20 rounded-xl hidden  group-hover/ball:block opacity-40'>
                  <p className=' px-3 text-black'>{movie.status}</p>
                </div>
                {movie.status==='Released'?
                <>
                  <div className="absolute top-0 right-0 -mr-1 -mt-1 w-4 h-4 rounded-full bg-green-300 animate-ping"></div>
                  <div className="absolute top-0 right-0 -mr-1 -mt-1 w-4 h-4 rounded-full bg-green-300"></div>
                </>
                :
                <>
                  <div className="absolute top-0 right-0 -mr-1 -mt-1 w-4 h-4 rounded-full bg-red-300 animate-ping"></div>
                  <div className="absolute top-0 right-0 -mr-1 -mt-1 w-4 h-4 rounded-full bg-red-300"></div>
                </>
                }
              </div>
              <h2 className={`${styles.heroSubText} text-black flex-row`}>{movie.title} <span className='text-sm text-gray-700'>{movie.runtime} mins</span></h2>
              <p className={styles.sectionSubText}>Release Date: {movie.release_date}</p>
              <p className="mt-4">{movie.overview}</p>
              <p className="mt-4"></p>

              <div className="flex items-center">
                  <svg className={`w-4 h-4 mr-1 ${Number(movie.vote_average)>=0 ? 'text-yellow-700':'text-gray-500'} `} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                      <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
                  </svg>
                  <svg className={`w-4 h-4 mr-1 ${Number(movie.vote_average)>=2 ? 'text-yellow-700':'text-gray-500'} `} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                      <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
                  </svg>
                  <svg className={`w-4 h-4 mr-1 ${Number(movie.vote_average)>=4 ? 'text-yellow-700':'text-gray-500'} `} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                      <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
                  </svg>
                  <svg className={`w-4 h-4 mr-1 ${Number(movie.vote_average)>=6 ? 'text-yellow-700':'text-gray-500'} `} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                      <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
                  </svg>
                  <svg className={`w-4 h-4 mr-1 ${Number(movie.vote_average)>=8 ? 'text-yellow-700':'text-gray-500'} `} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                      <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
                  </svg>
                  
                  <p className="ml-2 text-sm font-bold text-gray-900 dark:text-white">Rating: {movie.vote_average}/10</p>
                  <span className="w-1 h-1 mx-1.5 bg-gray-500 rounded-full dark:bg-gray-400"></span>
                  <a href={movie.homepage ? movie.homepage:'#'} className="text-sm font-medium text-gray-900 underline hover:no-underline dark:text-white">{movie.vote_count} reviews</a>
              </div>

              <div className="mt-4">
                <p className="font-semibold">Genres:</p>
                <ul className="list-disc list-inside">


                  {movie.genres.map((genre) => (
                    <span className={badges[Math.floor(Math.random() * movie.genres.length)]} key={genre.id}>{genre.name}</span>
                    
                  ))}
                </ul>
              </div>
            </div>
          </div>
          <div>
            
          </div>
        </>
        :
        <Loader/>  
      }
      <ToastContainer/>
    </>
  )
}
