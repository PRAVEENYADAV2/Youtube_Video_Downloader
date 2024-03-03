import React, { useState } from 'react';

function Details({ thumbnails, title, discription, options, inputValue: url}) {
    const [showDiscription, setShowDiscription] = useState(100);
    const [show, setShow] = useState(false)

    function handleShowMore() {
        if (show) {
            setShowDiscription(100)
        }
        if (!show) {
            setShowDiscription(discription.length)
        }
        setShow(show => !show)
    }
    const dots = show ? " " : "....";
    function handleDownload(url, itag) {
        console.log(itag)
        const downloadUrl = `http://192.168.1.3:5000/download?url=${url}&itag=${itag}`;
        window.location.href = downloadUrl;
    }
    return (
        <div className="details  grid lg:grid-cols-3 grid-cols-1 pt-5 gap-5">
            <div className="img">
                <img src={thumbnails[thumbnails.length - 1].url} alt={title} className='rounded-lg' />
            </div>
            <div className="title&dis">
                <h1 className='text-xl font-bold capitalize text-purple-700 mb-5'>{title}</h1>
                <div className=' overflow-scroll'>
                    <p>{discription.slice(0, showDiscription) + dots}</p>
                    <button className='bg-gray-300 p-2 rounded-md' onClick={handleShowMore}>
                        {show ? "Show less" : "Show more"}
                    </button>
                </div>
            </div>
            <div className="downloadOptions flex md:flex-col flex-wrap gap-3">
                {options.map((option, i) => {
                    return (<button key={i} className='bg-[#256ab8] text-white font-medium rounded-md p-2 sm:w-fit md:w-auto' onClick={() => handleDownload(url, option.itag)}>
                        {option.mimeType.split(' ')[0]} {option.qualityLabel ? option.qualityLabel : option.audioQuality}
                    </button>)
                })}
            </div>
        </div>
    )
}

export default Details;