import {fbdao} from "./fbdao.js"

test("constructor",()=>{
    expect(new fbdao());
});

test('construct and immediately add',()=>{
    let toAdd = {
        segmentName: "test"
    };
    let scoresArray = ["A", 0.0];
    let myfbdao = new fbdao();
    myfbdao.add(toAdd, scoresArray);
});

test('get added object', ()=>{
  let toAdd = {
      segmentName: "test2",
      otherData: 10
  }
  let myfbdao = new fbdao();
  let scoresArray = ["F", 98.6];
  myfbdao.add(toAdd, scoresArray);
  element = myfbdao.getElementBySegmentName("test2");
  expect(element.SegmentDataObject).toEqual({segmentName:"test2", otherData:10}));
  expect(element.scoresArray).toEqual(["F", 98.6]);
});
