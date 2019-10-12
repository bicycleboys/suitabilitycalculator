
/***
 * Data Access Object for indexedDB
 */
export class IDBDao{
    IDBDao(){
        console.log("dao constructed");
        var dbRequest = window.indexedDB.open("Segment Data",1);
        dbRequest.onerror = function(e){
            throw new Error("Issue with indexedDB");
        }
        dbRequest.onsuccess = function(e){
            this.db = e.target.result;
            this.objectStore = this.db.createObjectStore("segments", { keyPath: "segmentName" });

        }
    }

    add(infoObject){
        var request = this.db.transaction(["segments"], "readwrite")
                .objectStore("segments")
                .add(infoObject);
        request.onsuccess = function(){
            return "done!";
        }
    };

    getList(){
        var objectStore = db.transaction("segments").objectStore("segments");

        objectStore.getAll().onsuccess = function(event) {
            return event.target.result;
          };
    }

    getInfo(segmentName){
        var request = this.db.transaction(["segments"], "readwrite")
                .objectStore("segments")
                .get(segmentName);
    }
}