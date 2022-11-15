import './App.css';
import Model2 from './Model2'
import { Canvas } from '@react-three/fiber'
import Model from './Model'
import FaceFollower from './face_detect';

const drawWidth = "800px";
const drawHeight = "600px";

function App() {
  return (
      <div>
        <div class="three-wrapper" style={{
           width: drawWidth,
           height: drawHeight,
           position: 'fixed',
           zIndex:2,
         }}>
          <Canvas>
            <ambientLight />
            <FaceFollower />
          </Canvas>
        </div>

        <canvas id="output" style = {{
           width: drawWidth,
           height: drawHeight,
          position: 'fixed',
          zIndex: 3,
        }}></canvas>

        <video id="video" style={{
           width: drawWidth,
           height: drawHeight,
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
