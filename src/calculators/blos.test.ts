import * as blos from './blos';

test("Excel Example", ()=>{
  let object = {
      name: "test",
    laneCount: 1,
    devided: false,
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
