import request from "supertest";
import { app } from "../../app";

it('return a 201 on sucessful signup', async () => {
    return request(app)
        .post('/api/users/signup')
        .send({
            email: "test@test.com",
            password: 'passwordtest'
        })
        .expect(201);
});

it('return a 400 with invalid email', async () => {
    return request(app)
        .post('/api/users/signup')
        .send({
            email: "test",
            password: 'passwordtest'
        })
        .expect(400);
});

it('return a 400 with invalid password', async () => {
    return request(app)
        .post('/api/users/signup')
        .send({
            email: "test",
            password: 'pas'
        })
        .expect(400);
});

it('return a 400 with missing email and password', async () => {
    return request(app)
        .post('/api/users/signup')
        .send({})
        .expect(400);
});

it('disallows duplicate emil', async () => {
    await request(app)
        .post('/api/users/signup')
        .send({
            email: "test1@gmail.com",
            password: 'password123'
        })
        .expect(201)

    await request(app)
        .post('/api/users/signup')
        .send({
            email: "test1@gmail.com",
            password: 'password123'
        })
        .expect(400)
})


it('sets a cookie in successful sign up', async () => {
    const response = await request(app)
        .post('/api/users/signup')
        .send({
            email: "test1@gmail.com",
            password: 'password123'
        })
        .expect(201)

    expect(response.get('Set-Cookie')).toBeDefined();
    //for this if we send request on http this will return undefinde because on app.ts we have set secure as true
    // so on http id will not show up. we https for it
})