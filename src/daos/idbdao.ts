import {openDB, DBSchema, IDBPDatabase} from 'idb'

/***
 * Data Access Object for indexedDB
 */
export class IDBDao implements Dao{
    dbPromise:Promise<IDBPDatabase<any>>;

    constructor(){
        if(typeof window.indexedDB == 'undefined'){
            throw Error("Your environment doesn't support IndexedDB");
        }
        
        this.dbPromise = openDB("Segment Data",2,{
            upgrade(db,oldVersion,newVersion,transaction){
                db.createObjectStore("segments", { keyPath: "segmentName" });
            },
            blocked(){},
            blocking(){}
        });
    }

    add(data: SegmentDataObject, scores: CalculatorResponse[]): void {
        this.dbPromise.then(d=>d.put("segments",{data,scores}))
    }

    async getList(){
        return (await this.dbPromise).getAll("segments");
    }

    async getInfo(key:any){
        return (await this.dbPromise).get("segments",key);
    }

    remove(key: any): void {
        throw new Error("Method not implemented.");
    }
}