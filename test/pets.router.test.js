import { describe, it } from "mocha";
import { expect } from "chai";
import supertest from "supertest";
import fs from "fs";
import mongoose, { isValidObjectId } from "mongoose";

const requester = supertest("http://localhost:3000")

try {
    await mongoose.connect('mongodb+srv://gustelio97:a5DCwTHmrIpASlMC@cluster0.m9fgt.mongodb.net')
} catch (error) {
    console.log("error: ", error.message)
};

describe("Test de ruta de pets", function () {
    this.timeout(10_000)
    after(async () => {
        await mongoose.connection.collection("pets").deleteMany({ specie: "test" })
    })
    it("Si ejecuto un get a /api/pets, retorna un status code 200", async () => {
        let { statusCode } = await requester.get("/api/pets")
        expect(statusCode).to.be.eq(200)
    })

    it("Si ejecuto un get a /api/pets, retorna un json con una property status con valor 'success'", async () => {
        let { body } = await requester.get("/api/pets")
        expect(body).to.has.property("status").and.to.be.equal("success")
    })

    it("Si ejecuto un get a /api/pets, retorna un json con una property payload de tipo array", async () => {
        let { body } = await requester.get("/api/pets")
        expect(body).to.has.property("payload").and.to.an("array")
    })

    it("Si ejecuto un get a /api/pets, retorna un json con una property payload de tipo array de mascotas que viene desde la DB", async () => {
        let { body } = await requester.get("/api/pets")
        expect(body).to.has.property("payload").and.to.an("array")
        if (body.payload && Array.isArray(body.payload) && body.payload.length > 0) {
            expect(body.payload[0]._id).to.be.ok
            expect(isValidObjectId(body.payload[0]._id)).to.be.true
            expect(body.payload[0].specie).to.be.ok
        }
    })

})