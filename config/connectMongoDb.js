const mongoose = require('mongoose');
const { mongoURI } = require("./configKeys")
const Grid = require("gridfs-stream");

const connectMongoDB = async() => {
    const db = mongoose.createConnection(mongoURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });

    db.on('error', function (error) {
        console.log(`MongoDB :: connection ${this.name} ${JSON.stringify(error)}`);
        db.close().catch(() => console.log(`MongoDB :: failed to close connection ${this.name}`));
    });

    db.on('connected', function () {
        mongoose.connect(mongoURI).then((res) => {
            gfs = Grid(res.connection.db, mongoose.mongo);
            gfs.collection("uploads");
        })
        mongoose.set('debug', function (col, method, query, doc) {
            console.log(`MongoDB :: ${this.conn.name} ${col}.${method}(${JSON.stringify(query)},${JSON.stringify(doc)})`);
        });
        console.log(`MongoDB :: connected ${this.name}`);
    });

    db.on('disconnected', function () {
        console.log(`MongoDB :: disconnected ${this.name}`);
    });

    return db;
}

module.exports = connectMongoDB