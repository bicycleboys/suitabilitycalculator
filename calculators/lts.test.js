import * as lts from './lts.js';

test('simple - stand alone', () => {
  let obj = {
    segmentType: "stand-alone"
  }
  expect(lts.calculate(obj)).toEqual({ grade: 'A', points: 1 });
});

test('simple - segregated', () => {
  let obj = {
    segmentType: "segregated"
  }
  expect(lts.calculate(obj)).toEqual({ grade: 'A', points: 1 });
});

test('bad segment type', () => {
  let obj = {
    segmentType: "bikelane"
  }
  expect(() => { lts.calculate(obj) }).toThrow();
})

test('PowerPoint example', () => {
  let obj = {
    segmentType: "bike lane",
    lanesAdjacent: true,
    laneCount: 1,
    lanesCombinedWidth: 13.5,
    speed: 30,
    blockage: "rarely"
  }
  expect(lts.calculate(obj)).toEqual({ grade: 'D', points: 3 });
});

test('mixed traffic 6 lane example',()=>{
  let obj={
    segmentType: "mixed traffic",
    totalLanes: 6
  }
  expect(lts.calculate(obj)).toEqual({grade: 'F', points:4});
});

test('mixed traffic 2 lane, 30mph example',()=>{
  let obj={
    segmentType: 'mixed traffic',
    totalLanes: 2,
    speed: 30,
    markedCenterlines: true,
    adt: 2500
  }
  expect(lts.calculate(obj)).toEqual({points:2,grade:'B'});
})