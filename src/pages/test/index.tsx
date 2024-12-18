import { useState, useRef, useEffect } from "react";
import { FFmpeg } from "@ffmpeg/ffmpeg";
import { toBlobURL, fetchFile } from "@ffmpeg/util";

function test() {
    const [loaded, setLoaded] = useState(false);
    const ffmpegRef = useRef(new FFmpeg());
    const videoRef = useRef<HTMLVideoElement | null>(null)
    const messageRef = useRef<HTMLParagraphElement | null>(null)
    const inputRef = useRef<HTMLInputElement | null>(null)

    useEffect(() => {
        load()
    }, [])

    const load = async () => {
        const baseURL = "https://unpkg.com/@ffmpeg/core-mt@0.12.6/dist/esm";
        const ffmpeg = ffmpegRef.current;
        // toBlobURL is used to bypass CORS issue, urls with the same
        // domain can be used directly.
        await ffmpeg.load({
            coreURL: await toBlobURL(`${baseURL}/ffmpeg-core.js`, "text/javascript"),
            wasmURL: await toBlobURL(`${baseURL}/ffmpeg-core.wasm`, "application/wasm"),
            workerURL: await toBlobURL(`${baseURL}/ffmpeg-core.worker.js`, "text/javascript"),
        });
        setLoaded(true);
        console.log('load');
    };

    const transcode = async () => {
        const file = inputRef.current!.files![0]
        console.log('file', file);
        try {
            if (file) {
                const ffmpeg = ffmpegRef.current;
                await ffmpeg.writeFile("inputFile", await fetchFile(file));
                console.log('已经写入');
                await ffmpeg.exec(['-i', "inputFile", "-c:a", "copy", 'output.mp4']);;
                console.log('执行完毕');
                const fileData = await ffmpeg.readFile('output.mp4');
                console.log('fileData', fileData);
                const data = new Uint8Array(fileData as ArrayBuffer);
                if (videoRef.current) {
                    videoRef.current.src = URL.createObjectURL(
                        new Blob([data.buffer], { type: 'video/mp4' })
                    )
                    videoRef.current.play();
                }
            }
        } catch (error) {
            console.log('Error during transcoding: ' + error);
        }
    };

    return loaded ? (
        <>
            <input ref={inputRef} type="file" />
            <video ref={videoRef} controls></video>
            <br />
            <button onClick={transcode}>Transcode avi to mp4</button>
            <p ref={messageRef}></p>
        </>
    ) : (
        <button onClick={load}>Load ffmpeg-core</button>
    );
}

export default test;