import {useState} from 'react'
import PropTypes from 'prop-types';
import Loader from './partials/Loader'
import styles from '../style';
export default function Movie({movie}) {
    const pathImg = 'https://image.tmdb.org/t/p/original';
    const {
        adult,
        backdrop_path,
        id,
        original_language,
        original_title,
        overview,
        poster_path,
        release_date,
        title,
        video,
        vote_average,
        vote_count
        } = movie;
    const [loading, setLoading] = useState(true);

    const handleImageLoad = () => {
        setLoading(false);
    };
    return (
        <>
        
            <div className="group hover:-translate-y-6 mb-7 hover:relative  relative w-full flex flex-col rounded-xl bg-white  bg-clip-border text-gray-700 shadow-md">
                <div className="group-hover:hidden group-hover:-z-10 group-hover:opacity-40 relative overflow-hidden rounded-xl bg-white bg-clip-border text-gray-700">
                    <img
                    src={`${pathImg}${poster_path}`}
                    alt={original_title}
                    className=" h-full w-full object-contain"
                    style={{ display: loading ? 'none' : 'block', width: '100%', height: '100%' }}
                    onLoad={handleImageLoad}
                    />
                    {loading &&
                        <Loader w={20}/>
                    }
                    
                </div>
                
                <div className="group-hover:mt-4 p-2 rounded-md ">
                    <div className="mb-2 flex flex-col items-center justify-between">
                        <p className={`block group-hover:hidden font-sans text-base font-medium leading-relaxed text-blue-gray-900 antialiased `}>
                            {title} 
                        </p>
                        <span className="bg-purple-100 text-purple-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-purple-900 dark:text-purple-300">{release_date}</span>
                    </div>
                    
                    <p className="block group-hover:hidden font-sans text-sm font-normal leading-normal text-gray-700 antialiased opacity-75">
                        {overview.split(' ').splice(0, 10).join(' ')} <span></span>
                    </p>
                    {overview.length!==0 ? <>
                        <p className="block group-hover:hidden font-sans text-sm font-normal leading-normal text-gray-700 antialiased opacity-75">
                        {overview.split(' ').splice(0, 7).join(' ')}...
                        </p>
                        <p className="hidden group-hover:block font-sans text-sm font-normal leading-normal text-black antialiased opacity-75">
                            {overview} <span></span>
                        </p>
                    </>: 
                    <h1> There is not overview
                    </h1>
                    }
                </div>
                <div className="hidden group-hover:block p-2 pt-0 mb-auto ">
                    <button
                    className=" w-full select-none rounded-lg bg-primary  py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white transition-all hover:scale-105 focus:scale-105 focus:opacity-[0.85] active:scale-100 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                    type="button"
                    >
                    Details
                    </button>
                </div>
            </div>
        </>
    )
}
Movie.propTypes={
    movie: PropTypes.object.isRequired,
}