import Test1Recordable from "./components/Test1";
import Test2Recordable from "./components/Test2";
import Test3Recordable from "./components/Test3";


export default function Home() {

  return (
    <main className="flex min-h-screen flex-col items-center  p-24">
      <div className="w-full grid text-3xl text-center">
        <h1>Pruebas tecnicas</h1>
      </div>
      <div className="mt-12 text-pretty lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-4 lg:text-left"><strong>Descripción:</strong>
        A continuación se presentan 3 desafíos de programación los cuales debes resolver por ti mismo utilizando el lenguaje de programación de tu preferencia, con excepción de un desafío que deberá ser resuelto con tecnologías web.

      </div>
      <div className="mt-12 text-pretty lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-4 lg:text-left">
        <strong>Instrucciones:</strong>
        <ul className="list-disc">
          <li>
            Al iniciar un desafio, se activara la grabacion de pantalla para guardar el proceso de desarrollo y resolucion de las pruebas.
          </li>
          <li>Asegrate de compartir toda la pantalla completa.</li>
          <li>Puebes usar google.</li>
          <li>Debes compartir tus archivos de video por medio de link de Drive o YouTube a edwindh@gmail.com</li>
          <li>Solo puedes hacer un desafio a la vez</li>
        </ul>
      </div>

      <Test2Recordable title="El puntaje mas alto">
        Primer desafio: <span className="italic">el puntaje mas alto</span>
      </Test2Recordable>

      <Test1Recordable title="Calcular salario">
        Segundo desafio: <span className="italic">calcular salario</span>
      </Test1Recordable>

      <Test3Recordable title="Lista de personajes">
        Tercer desafio: <span className="italic">lista de personajes</span>
      </Test3Recordable>
    </main>
  );
}
