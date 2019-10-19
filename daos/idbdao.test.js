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