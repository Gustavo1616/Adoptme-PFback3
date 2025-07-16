import Adoption from "../../src/dao/Adoption.js";
import mongoose from "mongoose";
import { describe, it } from "mocha";
import Assert from "assert";

try {
    await mongoose.connect("mongodb+srv://gustelio97:a5DCwTHmrIpASlMC@cluster0.m9fgt.mongodb.net")
} catch (error) {
    console.log("Error al conectar a la base de datos");
}
const assert = Assert.strict;
const adoptionDAO = new Adoption();

describe("Test dao adoption", function(){
    this.timeout(10_000)

    it("Si ejecuto el metodo get, retorna un array", async ()=>{
        let resultado= await adoptionDAO.get();
        assert.equal(Array.isArray(resultado), true)
    })

    it("Si ejecuto el metodo get, retorna un array de objetos con la property _id", async()=>{
        let resultado=await adoptionDAO.get();
        if(Array.isArray(resultado) && resultado.length >0){
            assert.ok(resultado[0]._id)
        }
    })

    it("Si ejecuto el metodo get, retorna un array de objetos con la property owner", async()=>{
        let resultado=await adoptionDAO.get();
        if(Array.isArray(resultado) && resultado.length >0){
            assert.ok(resultado[0].owner)
        }
    })

    it("Si ejecuto el metodo get, retorna un array de objetos con la property pet", async()=>{
        let resultado=await adoptionDAO.get();
        if(Array.isArray(resultado) && resultado.length >0){
            assert.ok(resultado[0].pet)
        }
    })

        it("Si ejecuto el método get, retorna un array de usuarios de la DB", async () => {
        let resultado = await adoptionDAO.get()
        assert.equal(Array.isArray(resultado), true)
        if (Array.isArray(resultado) && resultado.length > 0) {
            assert.ok(resultado[0].email)
            assert.ok(resultado[0]._id)
            assert.equal(isValidObjectId(resultado[0]._id), true)
        }
    })

})