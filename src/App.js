import './App.css';
import { Canvas } from '@react-three/fiber'
import FaceFollower from './FaceFollower';

const drawWidth = "640px";
const drawHeight = "480px";
const videoID = "video";
const outputCanvasID = "output";

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
            <FaceFollower videoID={videoID} outputID={outputCanvasID}/>
          </Canvas>
        </div>

        <canvas id={outputCanvasID} style = {{
           width: drawWidth,
           height: drawHeight,
          position: 'fixed',
          zIndex: 3,
        }}></canvas>

        <video id={videoID} style={{
           width: drawWidth,
           height: drawHeight,
          position: 'fixed',
          zIndex: 1,
        }}></video>
      </div>
  );
}

export default App;
