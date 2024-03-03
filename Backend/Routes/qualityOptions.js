import express from 'express';
import ytdl from 'ytdl-core';

const optionRouter = express.Router();
function filterVideoObjects(videoObjects) {
    return videoObjects.filter(video => {
        if (+video.itag === 18) {
            return true;
        } else if (+video.itag === 22) {
            return true;
        } else if (video.qualityLabel == '1080p60' || video.qualityLabel == '1080p' || video.qualityLabel == '1080') {
            return true;
        } else if (+video.itag === 140) {
            return true;
        }
        return false;
    });
}
optionRouter.get('/options', async(req, res) => {
    const videoUrl = req.query.url;
    if(!videoUrl) {
        return res.status(404).json({
            status: "Fail",
            message: "Please specify the url"
        })
    }
    const isValid = ytdl.validateURL(videoUrl)
    if(!isValid){
        return res.status(404).json({
            status: "Fail",
            message: "Please specify valid URL"
        })
    }
    const info = await ytdl.getBasicInfo(videoUrl);
    const formats = info.formats;
    const options = filterVideoObjects(formats);

    const details = {title: info.videoDetails.title, discription: info.videoDetails.description, author: info.videoDetails.author.name, thumbnails: info.videoDetails.thumbnails}
    return res.status(200).json({
        status: "Success",
        options,
        details
    })
})

export default optionRouter;