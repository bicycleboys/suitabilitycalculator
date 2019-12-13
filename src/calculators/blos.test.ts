import * as blos from './blos';

test("Excel Example", ()=>{
  let object:SegmentDataObject = {
    segmentName: "test",
    laneCount: 1,
    median: false,
    runningSpeed: 30.0,
    adt: 12000,
    wol: 11.0,
    wbl: 5.0,
    wos: 8.5,
    curb: true,
    ppk: 50,
    pc: 4.0,
    phv: 4.0
  }
  expect(blos.calculate(object)).toEqual({ grade: 'C', points: 3.19, name: "BLOS" });
});
test("Other Excel Example", ()=>{
  let object:SegmentDataObject = {
    segmentName: "test",
    laneCount: 1,
    median: true,
    runningSpeed: 30.0,
    adt: 6000,
    wol: 11.0,
    wbl: 5.0,
    wos: 8.0,
    curb: true,
    ppk: 50,
    pc: 5.0,
    phv: 4.0
  }
  expect(blos.calculate(object)).toEqual({ grade: 'C', points: 2.78, name: "BLOS" });
});
