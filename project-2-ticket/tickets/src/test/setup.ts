import { MongoMemoryServer } from 'mongodb-memory-server' // to test only
import mongoose from 'mongoose'
import { app } from '../app'
import request from 'supertest';

let mongo: any;
beforeAll(async () => {
    process.env.JWT_KEY = 'asssdafff' //just to test
    mongo = await MongoMemoryServer.create();
    const mongoUri = mongo.getUri();

    await mongoose.connect(mongoUri, {});
});

beforeEach(async () => {
    if (mongoose.connection.db) {
        const collections = await mongoose.connection.db.collections();

        for (let collection of collections) {
            await collection.deleteMany({});
        }
    }
});

afterAll(async () => {
    if (mongo) {
        await mongo.stop();
    }
    await mongoose.connection.close();
});


declare global {
    var signin: () => Promise<string[]>;
}

global.signin = async () => {
    // const email = 'test@gmail.com';
    // const password = 'password';

    // const response = await request(app)
    //     .post('/api/users/signup')
    //     .send({
    //         email,
    //         password
    //     })
    //     .expect(201)

    // const cookie = response.get('Set-Cookie')

    // if (!cookie) {
    //     throw new Error("Failed to get cookie from response");
    // }
    // return cookie;

    //todo
    //1.build a jwt payload
    //2.create jwt
    //3.turn session into json
    //4.take jsom and encode it as base64
    //5.return a string thats our cookie
}