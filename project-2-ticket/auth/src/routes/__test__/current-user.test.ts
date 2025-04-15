import request from "supertest";
import { app } from "../../app";

declare global {
    var signin: () => Promise<string[]>;
}

it('responds with details about th current user', async () => {
    const cookie = await signin();

    if (!cookie) {
        throw new Error("Cookie not set after signup");
    }

    const response = await request(app)
        .get("/api/users/currentuser")
        .set("Cookie", cookie) // setting cookie 
        .send()
        .expect(200);

    expect(response.body.currentUser.email).toEqual("test@gmail.com");
})

it('response with null if not authenticated', async () => {
    const response = await request(app)
        .get('/api/users/currentuser/')
        .send()
        .expect(200)

    expect(response.body.currentUser).toEqual(null);
})