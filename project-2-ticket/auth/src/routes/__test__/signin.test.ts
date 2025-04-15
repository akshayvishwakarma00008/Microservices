import request from "supertest";
import { app } from "../../app";

it('fails when a email doesnot exist', async () => {
    await request(app)
        .post('/api/users/signin')
        .send({
            email: "tes@gmail.com",
            password: 'password123'
        })
        .expect(400)
})

it('fails when an incorrect pasword is provided', async () => {
    await request(app)
        .post('/api/users/signup')
        .send({
            email: "test@gmail.com",
            password: 'password123'
        })
        .expect(201)

    await request(app)
        .post('/api/users/signin')
        .send({
            email: "test@gmail.com",
            password: 'password'
        })
        .expect(400)
})


it('it return with cookie with valid credentials', async () => {
    await request(app)
        .post('/api/users/signup')
        .send({
            email: "test@gmail.com",
            password: 'password123'
        })
        .expect(201)

    const response =  await request(app)
        .post('/api/users/signin')
        .send({
            email: "test@gmail.com",
            password: 'password123'
        })
        .expect(200)

        expect(response.get('Set-Cookie')).toBeDefined();
})