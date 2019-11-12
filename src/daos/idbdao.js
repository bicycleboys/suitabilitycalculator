import {openDB, deleteDB, wrap, unwrap} from 'idb'

/***
 * Data Access Object for indexedDB
 */
export class IDBDao{
    // db;
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

    add(infoObject){
        this.dbPromise.then(d=>d.put("segments",infoObject))
    };

    async getList(){
        return (await this.dbPromise).getAll("segments");
    }

    async getInfo(segmentName){
        return (await this.dbPromise).get("segments",segmentName);
    }
}
