import './App.css';
import { Canvas } from '@react-three/fiber'
import FaceFollower from './FaceFollower';

const drawWidth = "1280px";
const drawHeight = "960px";
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

        <canvas id="test" style = {{
           width: drawWidth,
           height: drawHeight,
          position: 'fixed',
          zIndex: 4,
        }}></canvas>

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
