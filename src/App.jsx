import { Canvas } from '@react-three/fiber' //Canvas manages 3d for us
import { Suspense, useEffect, useState } from 'react' //allows you for lazy loding
import Three from './component/three'
import './App.css'
import Home from './component/home'
import Reason from './component/Reason'
import Parallax from './component/Parallax'
import Loader from './component/Loader'


function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 5000); // Adjust the timeout as needed
  }, []);

  return (
    <>
    {isLoading ? (
      <Loader />
    ) : (
    <>
      <Home />
      <div>
        <Canvas id='three-canvas-container' shadows>
          <Suspense fallback={<></>}> {/*fallback is allows you to paass a react element*/}
            <Three />
          </Suspense>
        </Canvas>
      </div>
      <Reason />
      <Parallax />
    </>
    )}
    </>
  )
}

export default App
