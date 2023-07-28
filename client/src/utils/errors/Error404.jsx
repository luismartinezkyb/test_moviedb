import styles from "../../style.js"


export default function Error404() {
    return (
        <div className={`h-[92vh] flex items-center  justify-center w-full`}>
            <div className='p-8 rounded-2xl bg-tertiary w-[70%] sm:w-[60%]'>
                    
                    <p className={`${styles.sectionSubText}`}>Error | 404 </p>
                    <h3 className={styles.sectionHeadText}>El recurso al que intentas acceder no existe</h3>
                    
            </div>
        </div>
    )
}
