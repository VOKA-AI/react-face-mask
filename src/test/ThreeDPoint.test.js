import ThreeDPoint from '../classes/ThreeDPoint';

test('distance of 3D point', () => {
  var point1 = new ThreeDPoint(1,1,0);
  var point2 = new ThreeDPoint(2,2,1);
  expect(point1.distance(point2)).toBe(Math.sqrt(3));
  expect(point2.distance(point1)).toBe(point1.distance(point2));
  expect(point1.distance(point1)).toBe(0);
});
