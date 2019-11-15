import * as lts from './lts';

test('simple - stand alone', () => {
  let obj = {
    segmentName: 'test',
    segmentType: "stand-alone"
  }
  expect(lts.calculate(obj)).toEqual({ grade: 'A', points: 1, name: "LTS" });
});

test('simple - segregated', () => {
  let obj = {
    segmentName: 'test',
    segmentType: "segregated"
  }
  expect(lts.calculate(obj)).toEqual({ grade: 'A', points: 1, name: "LTS" });
});

test('bad segment type', () => {
  let obj = {
    segmentName: 'test',
    segmentType: "bikelane"
  }
  expect(() => { lts.calculate(obj) }).toThrow();
})

test('inadequate data1', () => {
  let obj = {
    segmentName: 'test',
    segmentType: "mixed traffic"
  }
  const out = {
    name:'LTS',
    because: expect.anything()
  }
  expect(lts.calculate(obj)).toMatchObject(out);
})


test('inadequate data2', () => {
  let obj = {
    segmentName: 'test',
    segmentType: "mixed traffic",
    totalLanes: 3
  }
  const out = {
    name:'LTS',
    because: expect.anything()
  }
  expect(lts.calculate(obj)).toMatchObject(out);
})

test('PowerPoint example', () => {
  let obj = {
    segmentName: 'test',
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
    segmentName: 'test',
    segmentType: "mixed traffic",
    totalLanes: 6
  }
  expect(lts.calculate(obj)).toEqual({grade: 'F', points:4, name: "LTS" });
});

test('mixed traffic 2 lane, 30mph example',()=>{
  let obj:SegmentDataObject={
    segmentName: 'test',
    segmentType: 'mixed traffic',
    totalLanes: 2,
    speed: 30,
    centerline: false,
    adt: 2500
  }
  expect(lts.calculate(obj)).toEqual({points:2,grade:'B', name: "LTS" });
})

test('unsignalized crossing good',()=>{
  let obj:SegmentDataObject={
    segmentName: 'test',
    segmentType: 'bike lane',
    laneCount:1,
    xStreetWidth: 3,
    laneWidth: 6,
    lanesAdjacent:false,
    speed: 30,
    centerline: false,
    adt: 2500,
    unsignalized: true,
    blockage: 'rarely',
    island: true
  }
  expect(lts.calculate(obj)).toEqual({points:1,grade:'A', name: "LTS" });
})

test('unsignalized crossing bad',()=>{
  let obj:SegmentDataObject={
    segmentName: 'test',
    segmentType: 'bike lane',
    laneCount:1,
    xStreetWidth: 4,
    laneWidth: 6,
    lanesAdjacent:false,
    speed: 30,
    centerline: false,
    adt: 2500,
    unsignalized: true,
    blockage: 'rarely',
    island: false
  }
  expect(lts.calculate(obj)).toEqual({points:2,grade:'B', name: "LTS" });
})