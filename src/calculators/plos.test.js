//TODO

import * as plos from './plos.js';

test("fixme",()=>{
    expect(true).toBe(true);
})

test("Excel Example", ()=>{
  let object = {
    laneCount: 1,
    devided: false,
    sr: 30.0,
    adt: 12000,
    wol: 11.0,
    wbl: 5.0,
    wos: 8.5,
    curb: true,
    ppk: 0.5,
    pc: 4.0,
    phv: 4.0,
    wbuf: 5.0,
    waa: 6.0,
    fb: false,
  }
  expect(plos.calculate(object)).toEqual({ grade: 'B', points: 2.45 });
});
