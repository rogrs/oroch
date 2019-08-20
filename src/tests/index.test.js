/*
  For a replica set, include the replica set name and a seedlist of the members in the URI string; e.g.
  uri = 'mongodb://mongodb0.example.com:27017,mongodb1.example.com:27017/admin?replicaSet=myRepl';
  For a sharded cluster, connect to the mongos instances; e.g.
  uri = 'mongodb://mongos0.example.com:27017,mongos1.example.com:27017:27017/admin';
 */

const client = new MongoClient(uri);
await client.connect();

/*
  Prerequisites: Assumes the collections already exist.
  CRUD operations in transactions must be on existing collections.
 */

/* Step 1: Start a client session. The default transaction options are optional.*/
const session = client.startSession({defaultTransactionOptions: {
   readConcern: { level: 'local' },
   writeConcern: { w: 'majority' },
   readPreference: 'primary'
}});


try {
  /*
     Step 2: Use withTransaction method to start a transaction,
     execute the callback, and commit (or abort on error).
     The withTransaction method only supports functions that return a `Promise`.
   */
  await session.withTransaction(async function() {
     const coll1 = client.db('mydb1').collection('foo');
     const coll2 = client.db('mydb2').collection('bar');

     // Important:: You must pass the session to the operations.
     await coll1.insertOne({ abc: 1 }, { session });

     // Important:: You must pass the session to the operations.
     await coll2.insertOne({ xyz: 999 }, { session });
  });
} catch (err) {
  // transaction failed after attempted retry
  // some error handling
}