import * as lts from './lts';

test('simple - stand alone', () => {
  let obj = {
    name: 'test',
    segmentType: "stand-alone"
  }
  expect(lts.calculate(obj)).toEqual({ grade: 'A', points: 1, name: "LTS" });
});

test('simple - segregated', () => {
  let obj = {
    name: 'test',
    segmentType: "segregated"
  }
  expect(lts.calculate(obj)).toEqual({ grade: 'A', points: 1, name: "LTS" });
});

test('bad segment type', () => {
  let obj = {
    name: 'test',
    segmentType: "bikelane"
  }
  expect(() => { lts.calculate(obj) }).toThrow();
})

test('inadequate data1', () => {
  let obj = {
    name: 'test',
    segmentType: "mixed traffic"
  }
  expect(lts.calculate(obj)).toEqual({name:"LTS"});
})


test('inadequate data2', () => {
  let obj = {
    name: 'test',
    segmentType: "mixed traffic",
    totalLanes: 3
  }
  expect(lts.calculate(obj)).toEqual({name:"LTS"});
})

test('PowerPoint example', () => {
  let obj = {
    name: 'test',
    segmentType: "bike lane",
    lanesAdjacent: true,
    laneCount: 1,
    lanesCombinedWidth: 13.5,
    speed: 30,
    blockage: "rarely"
  }
  expect(lts.calculate(obj)).toEqual({ grade: 'D', points: 3, name: "LTS" });
});

test('mixed traffic 6 lane example',()=>{
  let obj={
    name: 'test',
    segmentType: "mixed traffic",
    totalLanes: 6
  }
  expect(lts.calculate(obj)).toEqual({grade: 'F', points:4, name: "LTS" });
});

test('mixed traffic 2 lane, 30mph example',()=>{
  let obj={
    name: 'test',
    segmentType: 'mixed traffic',
    totalLanes: 2,
    speed: 30,
    markedCenterlines: true,
    adt: 2500
  }
  expect(lts.calculate(obj)).toEqual({points:2,grade:'B', name: "LTS" });
})