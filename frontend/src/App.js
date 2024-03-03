import { useState } from 'react';
import './App.css';
import VideoForm from './Component/Link';
import Details from './Component/Details';

function App() {
  const [inputValue, setInputValue] = useState('');
  const [videoDetails, setVideoDetails] = useState(null)
  const [isErr, setIsErr] = useState(false);
  const [errMessage, setErrorMessage] = useState("")
  return (
    <div className="App">
      <div className='container m-auto max-w-7xl p-5'>
        <h1 className='text-5xl font-bold mt-24 text-purple-700 mb-5'>YouTube Video Downloader </h1>
        <VideoForm setVideoDetails={setVideoDetails} inputValue={inputValue} setInputValue={setInputValue} setIsErr={setIsErr} setErrorMessage={setErrorMessage}></VideoForm>
        {isErr && <ErrorMessage errMessage={errMessage}></ErrorMessage>}
        {videoDetails && <Details title={videoDetails.details.title} discription={videoDetails.details.discription} thumbnails={videoDetails.details.thumbnails} options={videoDetails.options} inputValue={inputValue} />}
      </div>
    </div>
  );
};


function ErrorMessage({errMessage}){
  return <div className='text-center text-red-600 font-bold text-3xl'>
    <h1>Error: {errMessage}</h1>
  </div>
}
export default App;
