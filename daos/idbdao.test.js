import {IDBDao} from "./idbdao.js"

test("constructor",()=>{
    expect(new IDBDao());
});

test('construct and immediately add',()=>{
    let toAdd = {
        segmentName: "test"
    }
    let myIDBDao = new IDBDao();
    myIDBDao.add(toAdd);
})

test('get after adding',()=>{
    let toAdd = {
        segmentName: "test2",
        otherData: 10
    }
    let myIDBDao = new IDBDao();
    myIDBDao.add(toAdd);
    expect(myIDBDao.getInfo("test2")).toEqual({segmentName:"test2", otherData:10});
})

test('add 5 fast',()=>{
    let toAdd = [{segmentName: "t1"},{segmentName: "t2"},{segmentName: "t3"},{segmentName: "t4"},{segmentName: "t5"}];
    let myIDBDao = new IDBDao();
    for (o of toAdd){
        myIDBDao.add(o);
    }
    for(o of toAdd){
        expect(myIDBDao.getList()).toContainEqual(o);
    }
})