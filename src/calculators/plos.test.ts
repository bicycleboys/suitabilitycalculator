import * as plos from './plos';

test("Excel Example", () => {
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
        phv: 4.0,
        wbuf: 5.0,
        waa: 6.0,
        fb: false,
    }
    expect(plos.calculate(object)).toEqual({ grade: 'B', points: 2.45, name: "PLOS" });
});