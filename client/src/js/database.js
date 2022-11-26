import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
//replace console.error with actual function


export const putDb = async (content) => {

  console.log('put to database');

  const jateDb = await openDB('jate', 1);

  const tx = jateDb.transaction('jate', 'readwrite');

  const store = tx.objectStore('jate');

  //THIS IS NOW RIGHT - ORIGINALLY didn't have content parameter included
  const request = store.put({ id: 1, value: content });

  const result = await request;
  console.log('🚀 - data saved to the database', result.value);

}

// TODO: Add logic for a method that gets all the content from the database

//Done with help from mini project - just add jate database
export const getDb = async () => {
  console.log('get from database');

  const jateDb = await openDB('jate', 1);

  //probably could be readonly

  const tx = jateDb.transaction('jate', 'readwrite');

  const store = tx.objectStore('jate');

  //Is .get(1) not getAll()

  const request = store.get(1);

  const result = await request;

  console.log('result.value', result);
  return result?.value;

}

initdb();