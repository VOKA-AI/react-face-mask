import * as faceMesh from '@mediapipe/face_mesh';
import * as faceLandmarksDetection from '@tensorflow-models/face-landmarks-detection';
import { Face } from "kalidokit";

export class FaceDetector {

    async detect(video) {
        this.faces = await this.faceDetector.estimateFaces(video);
        return this.faces;
    }

    solve(videoElement) {
        let riggedFace;
        riggedFace = Face.solve(this.faces[0].keypoints, {
          runtime: this.runtime,
          video: videoElement,
        });
        return riggedFace;
    }

    delete() {
      this.faceDetector.dispose();
    }

    static async build(runtime = 'mediapipe', solutionPath = `https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh@${faceMesh.VERSION}`) {
        let newFaceDetector = new FaceDetector();
        const FaceMeshModel = faceLandmarksDetection.SupportedModels.MediaPipeFaceMesh;
        const detectorConfig = {
          runtime: runtime,
          solutionPath: solutionPath,
        };
        newFaceDetector.faceDetector = await faceLandmarksDetection.createDetector(FaceMeshModel, detectorConfig);
        newFaceDetector.runtime = runtime;
        newFaceDetector.solutionPath = solutionPath;
        return newFaceDetector;
  }
}
