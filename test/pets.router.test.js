import { describe, it } from "mocha";
import { expect } from "chai";
import supertest from "supertest";
import mongoose, { isValidObjectId } from "mongoose";
import { errorDictionary } from "../src/services/errors/EErrors.js";
import fs from "fs";

const requester = supertest("http://localhost:3000")


try {
    await mongoose.connect("mongodb+srv://gustelio97:eKS3jLTHcEmj5EFt@cluster0.m9fgt.mongodb.net/adoptme");
} catch (error) {
    console.error(error);
}

describe("Test de ruta de pets", function () {
    this.timeout(10_000)
    after(async () => {
        await mongoose.connection.collection("pets").deleteMany({ specie: "test" });
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

    it("Si envio los datos de una mascota válida a /api/pets, método post, genera un pet en la DB", async () => {
        let petMock = {
            name: "Bobby",
            specie: "test",
            birthDate: "2020-05-15"
        }
        let { body, statusCode } = await requester.post("/api/pets").send(petMock)
        expect(body).to.has.property("payload")
        expect(body.payload).to.has.property("_id")
        expect(isValidObjectId(body.payload._id)).to.be.true
    })

    it("Si envio los datos inválidos de una mascota a /api/pets, método post, retorna un objeto con la property status igual a error", async () => {
        let petMock = {
            specie: "test",
            birthDate: "2020-05-15"
        }
        let { body } = await requester.post("/api/pets").send(petMock)
        expect(body).to.has.property("error").to.be.eq(errorDictionary.pet.MISSING_FIELDS.message)
    })

    it("Si envio los datos inválidos de una mascota a /api/pets, método post, retorna status code de http 400", async () => {
        let petMock = {
            specie: "test",
            birthDate: "2020-05-15"
        }
        let { statusCode, statusType } = await requester.post("/api/pets").send(petMock)
        expect(statusCode).to.be.eq(400)
        expect(statusType).to.be.eq(4)
    })

    it("Si envio los datos válidos de una mascota a /api/pets, método post, retorna status code de http 201", async () => {
        let petMock = {
            name: "Bobby",
            specie: "test",
            birthDate: "2020-05-15"
        }
        let { statusCode, statusType } = await requester.post("/api/pets").send(petMock)
        expect(statusCode).to.be.eq(201)
        expect(statusType).to.be.eq(2)
    })

    it("Si envio los datos válidos de una mascota a /api/pets, método post, retorna un objeto con la propiedad status igual a success", async () => {
        let petMock = {
            name: "Bobby",
            specie: "test",
            birthDate: "2020-05-15"
        }
        let { body } = await requester.post("/api/pets").send(petMock)
        expect(body).to.has.property("status").and.to.be.eq("success")
    })

    it("Al enviar una mascota válida a /api/pets, método post, la respuesta debe tener un payload con specie igual a 'test'", async () => {
        let petMock = {
            name: "Bobby",
            specie: "test",
            birthDate: "2020-05-15"
        };
        let { body } = await requester.post("/api/pets").send(petMock);
        expect(body).to.have.property("payload")
        expect(body.payload).to.has.property("specie")
        expect(body.payload.specie).to.be.eq("test")
    });


    it("Si envio datos validos a /api/pets/withimage, método post, guarda la mascota con imagen en DB", async () => {
        let petMock = {
            name: "Bobby",
            specie: "test",
            birthDate: "2020-05-15"
        };
        let { body } = await requester.post("/api/pets/withimage")
            .field("name", petMock.name)
            .field("specie", petMock.specie)
            .field("birthDate", petMock.birthDate)
            .attach("image", "test/file/gato.jpg")
        expect(body).to.has.property("status").and.to.be.eq("success")
        expect(body).to.has.property("payload")
        expect(body.payload).to.has.property("_id")
        expect(isValidObjectId(body.payload._id)).to.be.true
        fs.unlinkSync(body.payload.image)
    })

    it("Si envio datos validos a /api/pets/withimage, método post, guarda la mascota y se sube la imagen en la DB", async () => {
        let petMock = {
            name: "Bobby",
            specie: "test",
            birthDate: "2020-05-15"
        };
        let { body } = await requester.post("/api/pets/withimage")
            .field("name", petMock.name)
            .field("specie", petMock.specie)
            .field("birthDate", petMock.birthDate)
            .attach("image", "test/file/gato.jpg")
        expect(fs.existsSync(body.payload.image)).to.be.true
        fs.unlinkSync(body.payload.image)
    })

    it("Si envio datos validos a /api/pets/withimage,método post, lo que se sube es una imagen a la DB", async () => {
        let petMock = {
            name: "Bobby",
            specie: "test",
            birthDate: "2020-05-15"
        };
        let { body } = await requester.post("/api/pets/withimage")
            .field("name", petMock.name)
            .field("specie", petMock.specie)
            .field("birthDate", petMock.birthDate)
            .attach("image", "test/file/gato.jpg")
        expect(body.payload.image).to.be.ok
        expect(/\.(jpg|jpeg|png)$/i.test(body.payload.image)).to.be.true;
        fs.existsSync(body.payload.image)
        fs.unlinkSync(body.payload.image)
    })


})
