import React, { useEffect, useState } from 'react'
import { ToastContainer } from 'react-toastify'
import Table from '../components/Table'
import axios from 'axios'
import { generateError } from '../utils/errors/alerts';
import Movie from '../components/Movie';
import Loader from '../components/partials/Loader'
import { useNavigate } from 'react-router-dom';


export default function Dashboard() {
  const API_URL = import.meta.env.VITE_URL_API;
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(0);
  const [loader, setLoader] = useState(true)
  const [movies, setMovies] = useState([]);
  const [input, setInput] = useState('')
  const navigate = useNavigate();
  const [showModal, setShowModal]= useState(false);
  const [modalData, setModalData] = useState([]);
  
  
  const onSubmit = (e) => {
      e.preventDefault();
      setShowModal(false)
      getMoviesByTitle(input)
      
  }


  const getMovies = () => {
    const queryParams = new URLSearchParams(location.search);
    let pageLocation = queryParams.get('page') ? queryParams.get('page') : 1;
    setCurrentPage(parseInt(pageLocation))
    axios.get(`${API_URL}api/movies?page=${pageLocation}`)
    .then(response => {
        setMovies(response.data.results)
        setTotalPages(response.data.total_pages);
        setLoader(false);
    })
    .catch(error => {
        console.log(error)
        generateError('Something went wrong with the request')
    })
  }
  const getMoviesByTitle=(name)=>{
    navigate(`?page=${currentPage}`)
    axios.get(`${API_URL}api/movies/title/${name}?page=${currentPage}`)
    .then(response => {
      console.log(response.data)
      if(response.data.results.length===0){
        generateError('There is no movies with that title')
        getMovies()
      }else{
        setMovies(response.data.results)
        setTotalPages(response.data.total_pages);
      }
      
      
    })
    .catch(error => {
        console.log(error)
        if(error.response.data.error){
          generateError(error.response.data.error)
        }else{
          generateError('Something went wrong with the request')
        }
        
    })
  }

  const handleTab = (value) => {
    if(value === 0){
        setCurrentPage(currentPage-1)
        navigate(`?page=${currentPage-1}`);
    }else{
        setCurrentPage(currentPage+1)
        navigate(`?page=${currentPage+1}`);
    }

  } 
  useEffect(() =>{
    if(input.length===0){
      getMovies();
    }else{
      getMoviesByTitle(input);
    }
  }, [currentPage])

  const handleChange = (e) => {
    const title = e.target.value;
    setCurrentPage(1);
    setInput(title)
    if(title.length===0){
        
        setShowModal(false)
        getMovies();
        return;
    }
    setShowModal(true)
    if(title.length%2==0){
      axios.get(`${API_URL}api/movies/title/${title}`)
      .then(response => {
          
          setModalData(response.data.results)
      })
      .catch(error => {
          console.log(error)
          generateError('Something went wrong with the request')
      })
    }
    
  }
  const handleAutosuggest = (name) => {
    setInput(name)
    setShowModal(false)
    
    getMoviesByTitle(name)
  }

  return (
    <>
      <div className='m-5'>
        <Table handleChange={handleChange} onSubmit={onSubmit} input={input}/>
        {
            showModal &&    
            <div className=" bg-white  z-10 p-4 rounded-xl flex flex-col border justify-center items-center">
                <dl className="w-full text-gray-900 divide-y divide-gray-200 dark:text-white dark:divide-gray-700">
                    {
                        modalData.length===0 ? <h1 className='text-black font-bold text-xl'>Movie not found</h1>
                        :
                        modalData.map((movie, i)=>{
                            return (
                                <div onClick={()=>handleAutosuggest(movie.title)} key={i} className="flex flex-col p-3 cursor-pointer hover:bg-gray-400">
                                    <dd className="text-lg text-black font-semibold">{movie.title} </dd>
                                </div>
                            )
                        })
                    }
                    
                </dl>

            </div>
        }
      </div>
      
      {
        loader ? <Loader w={20}/> :
        <>
          <Options currentPage={currentPage} handleTab={handleTab} totalPages={totalPages}/>

          <div className="m-5 mt-10 grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-6 2xl:grid-cols-7 gap-4">
          {
                        movies.length===0 ? <h1 className='text-black font-bold text-xl'>Movie not exists</h1>
                        :movies.map(movie=>{
              return (
                <Movie key={movie.id} movie={movie}/>
              )
            })}
          </div>
          <Options currentPage={currentPage} handleTab={handleTab} totalPages={totalPages}/>
        </>
      }
      <ToastContainer/>
    </>
  )
}

export function Options({currentPage, handleTab, totalPages}){
  return (
    <nav className="flex items-center justify-between pt-4 m-5" aria-label="Table navigation">
      <span className="text-sm font-normal text-gray-500">Showing <span className="font-semibold text-gray-900">{currentPage}</span> of <span className="font-semibold text-gray-900 ">{totalPages}</span></span>
      <ul className="inline-flex -space-x-px text-sm h-8">
          
        {currentPage-1!==0 &&(
            <>
            <li>
            <a  onClick={()=>handleTab(0)} className="flex items-center justify-center px-3 h-8 ml-0  leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 ">Previous</a>
            </li>
            <li>
                <a onClick={()=>handleTab(0)} className={`text-gray-500 bg-white border flex items-center justify-center px-3 h-8  border-gray-300  hover:bg-blue-100 hover:text-blue-700 `}>{currentPage-1}</a>
            </li>
            </>)}
        <li>
            <a  className={`text-blue-600 border bg-blue-50 flex items-center justify-center px-3 h-8  border-gray-300  hover:bg-blue-100 hover:text-blue-700 `}>{currentPage}</a>
        </li>
        {totalPages-currentPage>0&&
        <li>
            <a onClick={()=>handleTab(1)}  className={`text-gray-500 bg-white border flex items-center justify-center px-3 h-8  border-gray-300  hover:bg-blue-100 hover:text-blue-700 `}>{currentPage+1}</a>
        </li>
        }
        {totalPages>1 &&
        <li>
          <a onClick={()=>handleTab(1)} className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700">Next</a>
        </li>
        }
      </ul>
    </nav>
  )
}