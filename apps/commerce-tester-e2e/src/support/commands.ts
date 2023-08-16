// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

// eslint-disable-next-line @typescript-eslint/no-namespace
declare namespace Cypress {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface Chainable<Subject> {
    clearDbCollection (collection:string): Promise<void>;
  }
}
//
Cypress.Commands.add('clearDbCollection', (collection:string) => {

  return new Promise<number>((resolve, reject) => {
    console.log("Checking DB Version");
    const checkversionrequest = window.indexedDB.open('Commerce Plugin Tester');

    checkversionrequest.addEventListener('success', (evt) =>{
      console.log("In Check Version");
      const db:IDBDatabase = (evt.target as any).result;
      if (!db.objectStoreNames.contains( collection )) {
        console.log("Need to upgrade");
        const version = db.version;
        db.close();
        resolve (version);
      }else {
        const txn = db.transaction(collection, 'readwrite');
        txn.objectStore(collection).clear();
        resolve (-1);
      }
    });
  }).then((version:number) => {
    if (version!==-1) {
      // We need to create the collection, so force the upgrade....
      const upgraderequest = window.indexedDB.open('Commerce Plugin Tester', version+1);

      console.log("Upgrade Request created");
      upgraderequest.addEventListener('upgradeneeded', ( event) => {
        console.log("upgrading");
        const db2:IDBDatabase = (event.target as any).result;
        db2.createObjectStore( collection,{keyPath:'_id', autoIncrement:true} );
        console.log("upgraded");

      });
    }
  })

});
