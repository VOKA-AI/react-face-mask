export function isiOS() {
    return /iPhone|iPad|iPod/i.test(navigator.userAgent);
}

export function isAndroid() {
    return /Android/i.test(navigator.userAgent);
}

export function isMobile() {
    return isAndroid() || isiOS();
}


function toRadians(degree) {
    return degree * Math.PI / 180;
}

/*
 * 利用fov和z坐标系位置，计算视角（Canvas）高度
 * eg. fovHeight(threeCamera.fov, threeCamera.position.z)
 */
export function fovHeight(fov, z) {
  if(fov >= 180) {
    return Infinity;
  }
  if(fov <= 0) {
    return 0;
  }
  let half_fov = fov / 2;
  let half_fov_radians = toRadians(half_fov);
  let fov_height = Math.tan(half_fov_radians) * z * 2;
  return fov_height;
}

/*
 * 利用（垂直）fov和z坐标系位置，计算视角（Canvas）高度
 * eg. fovWidth(threeCamera.fov, threeCamera.position.z, threeCamera.aspect)
 */
export function fovWidth(fov, z, aspect) {
    return fovHeight(fov, z) * aspect;
}

/*
 * 将格式为{k1:value1, k2:value2}的字典，按照value递减的顺序排序
 */
export function dictSortByValue(dict) {
    var sorted_keys = Object.keys(dict).sort(function(a,b) {
        return dict[b] - dict[a];
    });
    var res = {}
    for(var key in sorted_keys){
        res[sorted_keys[key]] = dict[sorted_keys[key]];
    }
    return res;
}

/*
 * 将格式为{k1:value1, k2:value2}的字典，返回value最大的一组kv
 */
export function dictMax(dict) {
    var max_k = Object.keys(dict)[0];
    var max_v = dict[max_k];
    for(var key in dict) {
        if(max_v < dict[key]) {
            max_v = dict[key];
            max_k = key;
        }
    }
    let res = {};
    res[max_k] = max_v;
    return res;
}
