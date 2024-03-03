import express from 'express';
import ytdl from 'ytdl-core';

const downloadRouter = express.Router();


downloadRouter.get('/download', async (req, res) => {
    try {
        const videoUrl = req.query.url;
        const itag = req.query.itag;
        if (!ytdl.validateURL(videoUrl)) {
            return res.status(400).send('Invalid YouTube URL');
        }

        const info = await ytdl.getInfo(videoUrl);
        const [format] = info.formats.filter(el => el.itag == itag)
        res.header('Content-Disposition', `attachment; filename="${info.videoDetails.title}.mp4"`);
        ytdl(videoUrl, {format}).pipe(res);
    } catch (err) {
        console.error('Error:', err);
        res.status(500).send('Internal Server Error');
    }
});

export default downloadRouter;
