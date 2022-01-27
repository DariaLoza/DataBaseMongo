const { MongoClient } = require('mongodb');
const url = 'mongodb://localhost:27017';
const csvtojson = require("csvtojson");
const mongodb = require("mongodb").MongoClient;
const readline = require('readline-sync');
const name = readline.question("filename?");

csvtojson()
    .fromFile(name)
    .then(csvData => {
        console.log(csvData);

        mongodb.connect(
            url,
            { useNewUrlParser: true, useUnifiedTopology: true },
            (err, client) => {
                if (err) throw err;

                client
                    .db("task_8")
                    .collection("task_8")
                    .insertMany(csvData, (err, res) => {
                        if (err) throw err;

                        console.log(`Inserted: ${res.insertedCount} rows`);
                        client.close();
                    });
            }
        );
    });