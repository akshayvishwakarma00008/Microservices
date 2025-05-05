import request from 'supertest';
import { app } from '../../app';

it('has a route handler listening to /api/tickets for post request', async () => {
    const response = await request(app)
        .post('/api/tickets')
        .send({});

    expect(response.status).not.toEqual(404);
});

it('it can only be accessed if the user is signed in', async () => {
    await request(app)
        .post('/api/tickets')
        .send({})
        .expect(401)

});

it('return status other than 401 if user is signed in', async () => {
    const response = await request(app)
        .post('/api/tickets')
        .send({})

    expect(response.status).not.toEqual(401);

});

it('returns an error if an individual title is provded', async () => {

});

it('returns an error if an individual price is provded', async () => {

});
