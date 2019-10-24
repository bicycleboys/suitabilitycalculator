import {IDBDao} from "./idbdao.js"

describe('test basic idb methods',()=>{

beforeAll(()=>window.indexedDB.deleteDatabase("Segment Data"))

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
    myIDBDao.getInfo("test2").then(response=>
        expect(response).toEqual({segmentName:"test2", otherData:10}));
})

test('add 5 fast',()=>{
    let toAdd = [{segmentName: "t1"},{segmentName: "t2"},{segmentName: "t3"},{segmentName: "t4"},{segmentName: "t5"}];
    let myIDBDao = new IDBDao();
    for (let o of toAdd){
        myIDBDao.add(o);
    }
    let list = myIDBDao.getList();
    for(let o of toAdd){
        list.then(e=>expect(e).toContainEqual(o));
    }
})
})

test('no idb',()=>{
    let w = window.indexedDB;
    window.indexedDB = undefined;
    expect(()=>{new IDBDao()}).toThrow();
    window.indexedDB = w;
})