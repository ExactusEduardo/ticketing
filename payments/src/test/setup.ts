import { MongoMemoryServer } from 'mongodb-memory-server';
import request from 'supertest';
import mongoose from 'mongoose';
import { app } from '../app';
import jwt from 'jsonwebtoken';

declare global {
    var signin: (id?: string) => string[];
}

jest.mock('../nats-wrapper');

process.env.STRIPE_KEY = 'sk_test_51KhIc6C0el8N4pjT1Ay487b7IeU6rUMpBxYTJkhvZf2iv3J5K47rC6z1Phnvp9njOEGoHEzmHY1hcJjzU8aeQHBN00zrBFU2bE';

let mongo: any;
beforeAll(async () => {
    process.env.JWT_KEY = 'asdf';
    
    mongo = await MongoMemoryServer.create();
    const mongoUri = await mongo.getUri();
    /*
    await mongoose.connect(mongoUri, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
    */
    await mongoose.connect(mongoUri);
});
beforeEach(async () => {
    jest.clearAllMocks();
    
    const collections = await mongoose.connection.db.collections();
    for (let collection of collections) {
        await collection.deleteMany({});
    }
});
afterAll(async () => {
    await mongo.stop();
    await mongoose.connection.close();
});
global.signin = (id?: string) => {
    // Build a JWT payload. { id, email }
    const payload = {
        id: id || new mongoose.Types.ObjectId().toHexString(),
        email: 'test@test.com'
    }

    // Create the JWT
    const token = jwt.sign(payload, process.env.JWT_KEY!);

    // Build session Object. { jwt: MY_JWT }
    const session = { jwt: token };

    // Turn that session into JSON
    const sessionJSON = JSON.stringify(session);

    // Take JSON and encode it as base64
    const base64 = Buffer.from(sessionJSON).toString('base64');

    // return a string thats the cookie with the encoded data
    return [`session=${base64}`] ;
}