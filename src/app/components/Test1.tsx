"use client"

import { useState } from "react";


let media: MediaStream;
const Test1Recordable = ({
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
                            <strong>Insturcciones:</strong> La empresa Internacional de Salud (IIS) necesita ayuda para calcular el salario total de los empleados,
                            dado que diferentes factores pueden alterar el valor final de cada empleado.

                        </div>
                        <div className="mt-12 text-pretty lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-4 lg:text-left">
                            <strong>Tarea #1: </strong>
                            Implementa el metodo <code>multiplicadorDiasFaltandes</code> que retorna el multiplicador del salario basado en los dias que el empleado falto al trabajo.
                            Si el empleado ha faltado 5 o mas dias, tendra una penalidad de 15%.
                            <pre className="p-6 border-2 rounded-md">
                                int diasFaltantes = 3;<br />
                                multiplicadorDiasFaltandes(diasFaltantes);<br />
                            // ={">"} 1
                                <br />
                                diasFaltantes = 7;<br />
                                multiplicadorDiasFaltandes(diasFaltantes);<br />
                            // ={">"} 0.85
                            </pre>
                        </div>

                        <div className="mt-12 text-pretty lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-4 lg:text-left">
                            <strong>Tarea #2: </strong>
                            Implementa el metodo <code>multiplicadorProductosVendidos</code> que retorna el multiplicador de productos vendidos;
                            ISS paga 10 por cada producto vendido, pero si vende mas de 20, pagara 13 por cada producto.
                            <br />
                            Implementa el metodo <code>calcularBonoVentas</code> que retorna el total del bono que ganara el vendedor,
                            por los productos vendidos.
                            <pre className="p-6 border-2 rounded-md">
                                int productosVendidos = 21;<br />
                                multiplicadorProductosVendidos(productosVendidos);<br />
                            // ={">"} 1<br />
                                <br />
                                productosVendidos = 7;<br />
                                calcularBonoVentas(productosVendidos);<br />
                            // ={">"} 70
                            </pre>
                        </div>


                        <div className="mt-12 text-pretty lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-4 lg:text-left">
                            <strong>Tarea #3: </strong>
                            Implementa el metodo <code>calcularSalarioFinal</code> que retorna el total del salario ganado,
                            aplicando la penalizacion al salario base y luego sumar el bono por ventas.
                            <br />
                            El salario final no puede ser mayor a 2000.00.
                            <pre className="p-6 border-2 rounded-md">
                                int diasFaltantes = 2;<br />
                                int productosVendidos = 3;<br />
                                calcularSalarioFinal(diasFaltantes, productosVendidos);<br />
                                // ={">"} 1030
                            </pre>
                        </div>

                    </div>
                    <button className="p-4 bg-red-500 hover:border-gray-900 border-2 hover:bg-red-700" type="button" onClick={detenerGrabacion}>Detener grabacion</button>
                </>}


        </div>);
}

export default Test1Recordable;