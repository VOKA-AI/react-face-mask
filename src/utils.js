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

export function fovHeight(fov, z) {
  let half_fov = fov / 2;
  let half_fov_radians = toRadians(half_fov);
  let fov_height = Math.tan(half_fov_radians) * z * 2;
  return fov_height;
}