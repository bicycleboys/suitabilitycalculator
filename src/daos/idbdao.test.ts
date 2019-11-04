import { IDBDao } from "./idbdao"

describe('test basic idb methods', () => {

    beforeAll(() => window.indexedDB.deleteDatabase("Segment Data"))

    test("constructor", () => {
        expect(new IDBDao());
    });

    test('construct and immediately add', () => {
        let toAdd = {
            name: "test"
        }
        let myIDBDao = new IDBDao();
        myIDBDao.add(toAdd, []);
    })

    test('get after adding', () => {
        let toAdd = {
            name: "test2",
            otherData: 10
        }
        let myIDBDao = new IDBDao();
        let key = myIDBDao.add(toAdd, []);
        myIDBDao.getInfo("test2").then(response =>
            expect(response).toEqual({ name: "test2", otherData: 10 })).catch(e=>console.log("darn"));
    })

    test('add 5 fast', () => {
        let toAdd = [{ name: "t1" }, { name: "t2" }, { name: "t3" }, { name: "t4" }, { name: "t5" }];
        let myIDBDao = new IDBDao();
        for (let o of toAdd) {
            myIDBDao.add(o, []);
        }
        let list: Promise<{ key: any, data: SegmentDataObject, scores: CalculatorResponse[] }[]> = myIDBDao.getList();
        for (let o of toAdd) {
            list.then((e) => {
                let arr = [];
                for (let res of e) {
                    arr.push(res.data);
                }
                expect(arr).toContainEqual(o);
            })
        }
    })
})