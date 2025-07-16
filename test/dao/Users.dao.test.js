import Users from "../../src/dao/Users.dao.js";
import mongoose from "mongoose";
import { describe, it } from "mocha";
import Assert from "assert";

try {
    await mongoose.connect("mongodb+srv://gustelio97:a5DCwTHmrIpASlMC@cluster0.m9fgt.mongodb.net")
} catch (error) {
    console.log("Error al conectar a la base de datos");
}
const assert = Assert.strict;
const usersDAO = new Users();

describe("Test dao users", function () {
    this.timeout(10_000)

    it("Si ejecuto el metodo get, retorna un array", async () => {
        let resultado = await usersDAO.get();
        assert.equal(Array.isArray(resultado), true)
    })

    it("Si ejecuto el metodo get, retorna un array de objetos con la property _id", async () => {
        let resultado = await usersDAO.get();
        if (Array.isArray(resultado) && resultado.length > 0) {
            assert.ok(resultado[0]._id)
        }
    })

    it("Si ejecuto el metodo get, retorna un array de objetos con la property first_name", async () => {
        let resultado = await usersDAO.get();
        if (Array.isArray(resultado) && resultado.length > 0) {
            assert.ok(resultado[0].first_name)
        }
    })

    it("Si ejecuto el metodo get, retorna un array de objetos con la property email", async () => {
        let resultado = await usersDAO.get();
        if (Array.isArray(resultado) && resultado.length > 0) {
            assert.ok(resultado[0].email)
        }
    })
})
