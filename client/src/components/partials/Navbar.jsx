
import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import styles from '../../style'

export default function Navbar() {
    const [toggle, setToggle] = useState(false)
    
    
    return (
        <>
            <nav className="bg-tertiary">
                <div className=" shadow-2xl px-2 sm:px-6 lg:px-8 border-b-2 border-gray-800">
                    <div className=" flex h-16 items-center justify-between">
                        <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                        
                        </div>
                        <div className="flex flex-1 items-center justify-center">
                            <div className="flex flex-shrink-0 items-center ">
                                <a href='/' className={`${styles.heading2} p-2`}>
                                    Movies App
                                </a>
                                
                            </div>
                        </div>
                    
                    </div>
                </div>
            </nav>
        </>
    )
}


