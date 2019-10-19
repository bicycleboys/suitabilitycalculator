/***
 * Data Access Object for indexedDB
 */
export class IDBDao{
    // db;
    constructor(){
        if(typeof window.indexedDB == undefined){
            throw Error("Your environment doesn't support IndexedDB");
        }

        async function setup(){
            function t(){
                return new Promise((resolve,reject)=>{
                    var dbRequest = window.indexedDB.open("Segment Data",2);
                    dbRequest.onerror = function(e){
                        reject("Issue with indexedDB");
                    }
                    dbRequest.onupgradeneeded = function(e) { 
                        // Save the IDBDatabase interface 
                        let db = e.target.result;
                      
                        // Create an objectStore for this database
                        db.createObjectStore("segments", { keyPath: "segmentName" });
                        resolve(db);
                      };
                    dbRequest.onsuccess = function(e){
                        let db = e.target.result;
                        resolve(db);
                    }
                })
            }

            db = await t();
            console.log(db);
            return db;
        }
        this.db = setup();
        console.log(this.db);
    }

    add(infoObject){
        //what to do if this gets called before the constructor?
        console.log(this);
        var request = this.db.transaction("segments", "readwrite")
                .objectStore("segments")
                .add(infoObject);
        request.onsuccess = function(){
            return "done!";
        }
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