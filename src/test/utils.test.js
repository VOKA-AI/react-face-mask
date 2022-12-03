import { fovHeight } from '../utils';

test('distance of 3D point', () => {
    expect(fovHeight(90, 1) - 2).toBeLessThan(0.00001);
    expect(fovHeight(180,1)).toBe(Infinity);
    expect(fovHeight(0, 1000)).toBe(0);
})
