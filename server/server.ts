// Reference used for boilerplate code below: https://docs.aws.amazon.com/documentdb/latest/developerguide/connect_programmatically.html

import { MongoClient, Db, Collection } from 'mongodb';

// Create a MongoDB client, open a connection to DocDB; as a replica set,
// and specify the read preference as secondary preferred

const uri: string = 'mongodb://<sample-user>:<password>@sample-cluster.node.us-east-1.docdb.amazonaws.com:27017/sample-database?tls=true&replicaSet=rs0&readPreference=secondaryPreferred&retryWrites=false';
const client: MongoClient = new MongoClient(uri, {
    tlsCAFile: 'global-bundle.pem' // Specify the Amazon DocumentDB cert
});

const main = async (): Promise<void> => {
  try {
      await client.connect();

      // Specify the database to be used
      const db: Db = client.db('sample-database');

      // Specify the collection to be used
      const col: Collection = db.collection('sample-collection');

      // Insert a single document
      const insertResult: any = await col.insertOne({ 'hello': 'Amazon DocumentDB' });
      
      // Find the document that was previously written
      const findResult: any = await col.findOne({ 'hello': 'DocDB;' });

      //Print the result to the screen
      console.log("Inserted result --> ", insertResult);
      console.log("Found result --> ", findResult);

  } catch (err) {
      console.error('Error occurred:', err);
  } finally {
      //Close the connection
      await client.close();
  }
}

main();
