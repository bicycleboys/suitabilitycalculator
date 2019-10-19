import {openDB, deleteDB, wrap, unwrap} from 'idb'

/***
 * Data Access Object for indexedDB
 */
export class IDBDao{
    // db;
    constructor(){
        if(typeof window.indexedDB == undefined){
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

    getList(){
        console.log(this);
        var objectStore = this.db.transaction("segments").objectStore("segments");

        return new Promise((resolve,reject)=>{
            objectStore.getAll().onsuccess = function(event) {
            console.log("get all worked");
            resolve(event.target.result);
            }
            })
    }

    getInfo(segmentName){
        var request = this.db.transaction(["segments"], "readwrite")
                .objectStore("segments")
                .get(segmentName);
    }
}