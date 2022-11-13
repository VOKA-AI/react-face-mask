import './App.css';
import Model2 from './Model2'
import { Canvas } from '@react-three/fiber'
import Model from './Model'

function App() {
  return (
      <div class="canvas-wrapper">
        <div class="three-wrapper" style={{
           width: "640px",
           height: "480px",
           position: 'fixed',
           zIndex:2,
         }}>
          <Canvas>
            <ambientLight />
            <Model />
          </Canvas>
        </div>

        <canvas id="output" style = {{
          position: 'fixed',
          zIndex: 3,
        }} width = "640px" height = "480px"></canvas>

        <video id="video" style={{
          position: 'fixed',
          zIndex: 1,
        }} width = "640px" height = "480px" ></video>
      </div>
  );
}

/*
      <div className="App">
        <img id='face' src='./test_face.jpg' crossOrigin='anonymous' />
      </div>
*/
export default App;
