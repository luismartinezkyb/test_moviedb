import React, { useEffect, useState } from 'react'
import { ToastContainer } from 'react-toastify'
import Table from '../components/Table'
import axios from 'axios'
import { generateError } from '../utils/errors/alerts';
import Movie from '../components/Movie';
import Loader from '../components/partials/Loader'


export default function Dashboard() {
  const API_URL = import.meta.env.VITE_URL_API;
  const [currentPage, setCurrentPage] = useState(1)
  const [loader, setLoader] = useState(true)
  const [movies, setMovies] = useState([]);
  const [input, setInput] = useState('')
  const [showModal, setShowModal]= useState(false);
  const [modalData, setModalData] = useState([]);
    

  const onSubmit = (e) => {
      e.preventDefault();
      //buscar al usuario
  }


  const getMovies = () => {
    axios.get(`${API_URL}api/movies?page=${currentPage}`)
    .then(response => {
        
        setMovies(response.data.results)
        setLoader(false);
    })
    .catch(error => {
        console.log(error)
        generateError('Something went wrong with the request')
    })
  }

  

  const handleTab = (value) => {
    if(value === 0){
        setCurrentPage(currentPage-1)
        
    }else{
        setCurrentPage(currentPage+1)
    }
  } 
  useEffect(() =>{
    getMovies();
  }, [currentPage])

  const handleChange = (e) => {
    const title = e.target.value;
    setInput(title)
    if(title.length===0){
        setShowModal(false)
        getMovies();
        return;
    }
    setShowModal(true)
    if(title.length%2==0){
      axios.get(`${API_URL}api/movies/title/${title}?page=${currentPage}`)
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
    console.log(name)
    setShowModal(false)

    axios.get(`${API_URL}api/movies/title/${name}?page=${currentPage}`)
    .then(response => {
        setMovies(response.data.results)
    })
    .catch(error => {
        console.log(error)
        generateError('Something went wrong with the request')
    })
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
          <Options currentPage={currentPage} handleTab={handleTab}/>

          <div className="m-5 mt-10 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-6 2xl:grid-cols-7 gap-4">
            {movies.map(movie=>{
              return (
                <Movie key={movie.id} movie={movie}/>
              )
            })}
          </div>
          <Options currentPage={currentPage} handleTab={handleTab}/>
        </>
      }
      <ToastContainer/>
    </>
  )
}

export function Options({currentPage, handleTab}){
  return (
    <nav className="flex items-center justify-between pt-4 m-5" aria-label="Table navigation">
      <span className="text-sm font-normal text-gray-500">Showing <span className="font-semibold text-gray-900">{currentPage}</span> of <span className="font-semibold text-gray-900 "></span></span>
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
        <li>
            <a onClick={()=>handleTab(1)}  className={`text-gray-500 bg-white border flex items-center justify-center px-3 h-8  border-gray-300  hover:bg-blue-100 hover:text-blue-700 `}>{currentPage+1}</a>
        </li>
        <li>
            <a onClick={()=>handleTab(1)} className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700">Next</a>
          </li>
      </ul>
    </nav>
  )
}