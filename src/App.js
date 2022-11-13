import './App.css';
import Model2 from './Model2'
import { Canvas } from '@react-three/fiber'

function App() {
  return (
    <div id="main">
      <div class="container">
        <div class="canvas-wrapper">
          <canvas id="output"></canvas>
          <video id="video"></video>
        </div>
      </div>
    </div>
  );
}

/*
      <div className="App">
        <img id='face' src='./test_face.jpg' crossOrigin='anonymous' />
      </div>
*/
export default App;
