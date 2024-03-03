import React from 'react';
import { TextField, Button } from '@mui/material';



function VideoForm({ setVideoDetails, inputValue, setInputValue, setIsErr, setErrorMessage }) {
    const handleChange = (event) => {
        setInputValue(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const info = await fetch(`http://192.168.1.3:5000/options?url=${inputValue}`);
            const responseData = await info.json();
            if(responseData.status === "Success"){
                setVideoDetails(responseData)
                setIsErr(false)
            }
            if(responseData.status === "Fail"){
                setErrorMessage(responseData.message)
                setVideoDetails(null)
                setIsErr(true)
            }
        } catch (err) {
            setVideoDetails(null)
        }
    };

    return (
        <form onSubmit={handleSubmit} className='flex flex-col justify-end '>
            <TextField fullWidth
                variant="outlined"
                value={inputValue}
                onChange={handleChange} label="Paste the YT link"
            />
            <div className='w-fit m-5'>
                <Button type="submit" variant="contained" color="primary">
                    Download Video
                </Button>
            </div>
        </form>
    );
}

export default VideoForm;
