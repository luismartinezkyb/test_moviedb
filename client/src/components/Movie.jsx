import {useState} from 'react'
import PropTypes from 'prop-types';
import Loader from './partials/Loader'
import no_image from '../assets/no_image.jpg';
import styles from '../style';
import { Link } from 'react-router-dom';
export default function Movie({movie}) {
    const PATH_IMG = import.meta.env.VITE_PATH_IMG;
    
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
                    src={`${PATH_IMG}${poster_path}`}
                    alt={original_title}
                    className=" h-full w-full object-contain"
                    style={{ display: loading ? 'none' : 'block', width: '100%', height: '100%' }}
                    onLoad={handleImageLoad}
                    />
                    {loading &&
                        <img
                        src={no_image}
                        alt={original_title}
                        className=" h-full w-full object-contain"
                        
                        />
                    }
                    
                </div>
                
                <div className="group-hover:mt-4 p-2 rounded-md group-hover:overflow-y-auto group-hover:max-h-[300px]">
                    <div className="mb-2 flex flex-col items-center justify-between">
                        <p className={`block group-hover:hidden font-sans text-base font-medium leading-relaxed text-blue-gray-900 antialiased `}>
                            {title} 
                        </p>
                        <span className="bg-purple-100 text-purple-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-purple-900 dark:text-purple-300">{release_date}</span>
                    </div>
                    
                    
                    {overview.length!==0 ? <>
                        <p className={`block group-hover:hidden ${styles.paragraph}`}>
                        {overview.split(' ').splice(0, 7).join(' ')}...
                        </p>
                        <p className={`hidden group-hover:block ${styles.paragraph}`}>
                            {overview} <span></span>
                        </p>
                    </>: 
                    <h1> There is not overview
                    </h1>
                    }
                </div>
                <div className="hidden group-hover:block p-2 pt-0 mb-auto ">
                    <Link to={`/movie/${id}`}><button
                    className={styles.buttonExpand}
                    type="button"
                    >
                    Details
                    </button></Link>
                </div>
            </div>
        </>
    )
}
Movie.propTypes={
    movie: PropTypes.object.isRequired,
}