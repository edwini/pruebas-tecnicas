"use client"

import { useState } from "react";


let media: MediaStream;
const Test3Recordable = ({
    title,
    children,
}: Readonly<{
    title: string
    children: React.ReactNode;
}>) => {
    const [recording, setRecording] = useState(false)
    const iniciarGrabacion = (endpoint: string) => async () => {
        media = await navigator.mediaDevices.getDisplayMedia({
            video: {
                frameRate: { ideal: 30 }
            }
        })
        const recorder = new MediaRecorder(media, {
            mimeType: "video/webm; codecs=vp8,opus"
        });
        recorder.start();
        const [video] = media.getVideoTracks();
        video.addEventListener("ended", () => {
            recorder.stop();
        })
        recorder.addEventListener("dataavailable", (event) => {
            const link = document.createElement("a")
            link.href = URL.createObjectURL(event.data);
            link.download = "test.webm"
            link.click()
        });
        setRecording(true)
    }
    const detenerGrabacion = async () => {
        // biome-ignore lint/complexity/noForEach: <explanation>
        media.getTracks().forEach(track => track.stop())
        setRecording(false);
    }
    return (
        <div className="mb-16 grid text-center lg:max-w-full lg:text-left">

            {!recording &&
                <button
                    type="button"
                    className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
                    onClick={iniciarGrabacion("/test1")}
                >
                    <h2 className={"mb-3 text-2xl font-semibold"}>
                        Iniciar
                        <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                            -&gt;
                        </span>
                    </h2>
                    <p className={"m-0 max-w-[30ch] text-sm opacity-50"}>
                        {children}
                    </p>
                </button>
            }
            {recording &&
                <>
                    <div className="mt-2 text-pretty ">
                        <div className="w-full grid text-2xl text-center">
                            <h1>{title}</h1>
                        </div>
                        <div className="mt-12 text-pretty lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-4 lg:text-left">
                            <strong>Insturcciones:</strong> Crea una pagina web que muestre una lista de los primero 20 personajes de Rick & Morty.
                            Y que permita ver del detalle de cada uno de ellos al navegar a una nueva pagina.
                            <br />
                            Utiliza la API de Rick & Morty: https://rickandmortyapi.com/api

                        </div>
                        <div className="mt-12 text-pretty lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-4 lg:text-left">
                            <strong>Tarea #1: </strong> Mustra la lista de 20 personajes. Debe mostrar el id y nombre del personaje.
                            <pre className="p-6 border-2 rounded-md">
                                REST API: https://rickandmortyapi.com/api/character <br />

                                Ejemplo: <br />
                                1. Rick Sanchez <br />
                                2. Morty Smith <br />
                                3. Beth Smith <br />
                                ... <br />
                            </pre>

                        </div>

                        <div className="mt-12 text-pretty lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-4 lg:text-left">
                            <strong>Tarea #2: </strong> hacer click sobre un nombre de personaje debe abrir una nueva ventada con el detalle del personaje.
                            Mostrando el ID, nombre, especie e imagen.
                            <pre className="p-6 border-2 rounded-md">
                                REST API: https://rickandmortyapi.com/api/character/1 <br />
                            </pre>
                            <img src="/rick.png" alt="Rick" />
                        </div>

                    </div>
                    <button className="p-4 bg-red-500 hover:border-gray-900 border-2 hover:bg-red-700" type="button" onClick={detenerGrabacion}>Detener grabacion</button>
                </>}


        </div>);
}

export default Test3Recordable;