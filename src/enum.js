export const RIGHT = "right";
export const LEFT = "left";

export const FaceMeshPoints = {
    eye: {
      [LEFT]: [130, 133, 160, 159, 158, 144, 145, 153],
      [RIGHT]: [263, 362, 387, 386, 385, 373, 374, 380],
    },
    brow: {
      [LEFT]: [35, 244, 63, 105, 66, 229, 230, 231],
      [RIGHT]: [265, 464, 293, 334, 296, 449, 450, 451],
    },
    pupil: {
      [LEFT]: [468, 469, 470, 471, 472],
      [RIGHT]: [473, 474, 475, 476, 477],
    },
    mouth: [13, 14, 61, 291],
}

export function getFaceMeshPoints(landmarks, pointIdxs) {
    /*
     * 获取landmarks中制定的点
     * 其中landmarks为468/478个点，pointIdxs为数组，包含所有想要的点的索引
     * 例如：getFaceMeshPoints(landmarks, FaceMeshPoints.eye[LEFT])
     */
    var res = [];
    for(var idx = 0;idx < pointIdxs.length;idx++) {
      if(pointIdxs[idx] >= landmarks.length) {
        continue;
      }
      res.push(landmarks[pointIdxs[idx]]);
    }
    return res;
}
