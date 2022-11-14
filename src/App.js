import './App.css';
import Model2 from './Model2'
import { Canvas } from '@react-three/fiber'
import Model from './Model'
import FaceFollower from './face_detect';

function App() {
  return (
      <div class="canvas-wrapper" style = {{
        width: "100%",
        height: "100%",
        position: "fixed",
      }}>
        <div class="three-wrapper" style={{
           width: "100%",
           height: "100%",
           position: 'fixed',
           zIndex:2,
         }}>
          <Canvas>
            <ambientLight />
            <FaceFollower />
          </Canvas>
        </div>

        <canvas id="output" style = {{
           width: "100%",
           height: "100%",
          position: 'fixed',
          zIndex: 3,
        }}></canvas>

        <video id="video" style={{
           width: "100%",
           height: "100%",
          position: 'fixed',
          zIndex: 1,
        }}></video>
      </div>
  );
}

/*
      <div className="App">
        <img id='face' src='./test_face.jpg' crossOrigin='anonymous' />
      </div>
*/
export default App;
