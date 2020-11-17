import request from 'supertest';
import app from '../index';

describe("testing the auth api", () => {
    it("test testing framework", () => {
        expect(2+2).toBe(4);
    });

    it("test signup api", async () => {
        const response = await request(app).post('/auth/sign-up').send({
            userName: "user1",
            password: "user1",
            email: "user1@gmail.com"
        });

        expect(response.status).toBe(200);
    });

    it("test login api", async () => {
        const response = await request(app).post('/auth/login').send({
            userName: "kranti",
            password: "kranti"
        });
        expect(response.status).toBe(200);
        process.env = Object.assign(process.env,
            { token: response.body.data.token });           
    });

    beforeAll(()=> {
        
    });
});


describe("testing the notes api", () => {
    it("test create note api", async () => {
        const response = await request(app).post('/notes')
        .send({
            title: "note1",
            description: "note1"
        })
        .set('x-access-token', process.env.token);
        expect(response.status).toBe(200);
    });

    it("test update note api", async () => {
        const response = await request(app).patch('/notes/10')
        .send({
            title: "Note1",
            description: "Note1"
        })
        .set('x-access-token', process.env.token);
        expect(response.status).toBe(200);
    });

    it("test get note by id api", async () => {
        const response = await request(app).get('/notes/10')
        .set('x-access-token', process.env.token);
        expect(response.status).toBe(200);
    });

    it("test get notes api", async () => {
        const response = await request(app).get('/notes')
        .set('x-access-token', process.env.token);
        expect(response.status).toBe(200);
    });
});