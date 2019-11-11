import {fbdao} from "./fbdao.js"
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

test("constructor",()=>{
  let myfbdao = new fbdao();
  expect(myfbdao);

});

test('construct and immediately add',()=>{
  let toAdd = {
    segmentName: "test"
  };
  let scoresArray = ["A", 0.0];
  let myfbdao = new fbdao();
  //console.log(myfbdao);
  //console.log(myfbdao.db);
  myfbdao.add(toAdd, scoresArray);

})

test('get added object', ()=>{
  let toAdd = {
    segmentName: "test2",
    otherData: 10
  }
  let myfbdao = new fbdao();
  let scoresArray = ["F", 98.6];
  myfbdao.add(toAdd, scoresArray);
  let element = myfbdao.getElementBySegmentName("test2");
  expect(element).toBeDefined();
  console.log(element);
  return element.then((array)=>{
    expect(array[0].SegmentDataObject).toEqual({segmentName:"test2", otherData:10})
    expect(array[0].Scores).toEqual(["F", 98.6])

  })
});

test('getDocID', ()=>{
  let myfbdao = new fbdao();
  myfbdao.db.collection("Segments").doc("ID").set({
    segmentName: "test3",
    otherData: 9000
  });
  let element= myfbdao.getElementById("ID");
  expect(element).toBeDefined();

  return element.then((element)=>{
    console.log(element);
    expect(element.segmentName).toEqual("test3");
    expect(element.otherData).toEqual(9000);

  })

})

test('delete', ()=>{
  let myfbdao = new fbdao();
  myfbdao.db.collection("Segments").doc("ToBeDeleted").set({
    segmentName: "test4",
    otherData: 404
  });
  let element= myfbdao.getElementById("ToBeDeleted");
  return element.then((element)=>{
    expect(element).toBeDefined();
  }).then((element)=>{
    myfbdao.deleteElement("ToBeDeleted")
  }).then((element)=>{
    element= myfbdao.getElementById("ToBeDeleted");
    expect(element).toEqual(expect.not.objectContaining({
      segmentName: "test4",
      otherData: 404
    }))

  })
})

test('update', () => {
  let myfbdao = new fbdao();
  myfbdao.db.collection("Segments").doc("ToBeUpdated").set({
    segmentName: "test5",
    otherData: 5
  });
  let element = myfbdao.getElementById("ToBeUpdated");
  return element.then((element=>{
    return expect(element).toBeDefined();
  })).then((element)=>{
    return myfbdao.updateElement("ToBeUpdated", "otherData", 55);
  }).then((element)=>{
    return element = myfbdao.getElementById("ToBeUpdated");
  }).then((element)=>{
    
    return expect(element).toEqual({
      segmentName: "test5",
      otherData: 55
    })
  })
})

afterAll(()=>{
  let myfbdao = new fbdao();
  myfbdao.closeConnection();
})