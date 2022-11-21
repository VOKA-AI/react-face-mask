import './App.css';
import { Canvas } from '@react-three/fiber'
import FaceFollower from './FaceFollower';

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

export default App;
