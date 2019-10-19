
/***
 * Data Access Object for indexedDB
 */
export class IDBDao{
    db;
    constructor(){
        let self = this;
        console.log("dao constructed");
        var dbRequest = window.indexedDB.open("Segment Data",2);
        dbRequest.onerror = function(e){
            throw new Error("Issue with indexedDB");
        }
        dbRequest.onupgradeneeded = function(e) { 
            // Save the IDBDatabase interface 
            self.db = e.target.result;
          
            // Create an objectStore for this database
            self.db.createObjectStore("segments", { keyPath: "segmentName" });
          };
        dbRequest.onsuccess = function(e){
            self.db = e.target.result;
            console.log(self);
        }
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