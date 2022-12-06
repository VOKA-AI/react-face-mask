export const RIGHT = "right";
export const LEFT = "left";

export const FaceMeshPoints = {
    eye: {
      [LEFT]: [33, 246, 161, 160, 159, 158, 157, 173, 133, 155, 154, 153, 145, 144, 163, 7],
      [RIGHT]: [263, 466, 388, 387, 386, 385, 384, 398, 362, 382, 381, 380, 374, 373, 390, 249],
      in_corner: { // 内眼角
        [LEFT]:[133],
        [RIGHT]:[362],
      },
      out_corner: { // 外眼角
        [LEFT]:[33],
        [RIGHT]:[263],
      },
      top: { // 上眼皮
        [LEFT]:[159],
        [RIGHT]:[386],
      },
      bottom: { // 下眼皮
        [LEFT]:[145],
        [RIGHT]:[374],
      },
    },
    brow: {
      [LEFT]: [46, 53, 52, 65, 55, 70, 63, 105, 66, 107],
      [RIGHT]: [276, 283, 282,, 295, 285, 300, 293, 334, 296],
    },
    pupil: {
      [LEFT]: [468, 469, 470, 471, 472],
      [RIGHT]: [473, 474, 475, 476, 477],
    },
    lips: [61, 146, 91, 181, 84, 17, 314, 405,321, 375, 291, 61, 185, 40, 39, 37, 0, 267, 269, 270, 409, 291, 78, 95, 88, 178, 87, 14, 317, 402, 318, 324, 308, 78, 191, 80, 81, 82, 13, 312, 311, 310, 415, 308],
    mouth_oval: [78, 191, 80, 81, 82, 13, 312, 311, 310, 415, 308, 324, 318, 402, 317, 14, 87, 178, 88, 95],
    face_oval: [10, 338, 297, 332, 284, 251, 389, 356, 454, 323, 361, 288, 397, 365, 379, 378, 400, 377, 152, 148, 176, 149, 150, 136, 172, 58, 132, 93, 234, 127, 162, 21, 54, 103, 67, 109],
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
