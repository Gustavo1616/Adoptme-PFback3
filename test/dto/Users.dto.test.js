import UserDTO from "../../src/dto/User.dto.js";
import { describe, it } from "mocha";
import { expect } from "chai";

describe("Test UserDTO", function () {
    it("si ejecuto la funcion getUserTokenFrom, retorna un objeto con las propiedades name, role, email", () => {
        let user = {
            first_name: "Franco",
            last_name: "Perez",
            role: "admin",
            email: "test@test.com"
        }
        let resultado = UserDTO.getUserTokenFrom(user)
        expect(resultado.name).to.exist
        expect(resultado.email).to.exist
        expect(resultado.role).to.exist
        expect(resultado).to.be.have.property("name").and.to.be.eq(`${user.first_name} ${user.last_name}`)
        expect(resultado).to.be.have.property("role").and.to.be.eq(user.role)
        expect(resultado).to.be.have.property("email").and.to.be.eq(user.email)
    });

    it("si ejecuto la funcion getUserTokenFrom, retorna un objeto con la propiedad name con first_name", function () {
        let user = {
            first_name: "Franco",
            last_name: "Perez",
            role: "admin",
            email: "test@test.com"
        }
        let resultado = UserDTO.getUserTokenFrom(user)
        expect(resultado).to.have.property("name")
        expect(resultado.name).to.include(user.first_name)
    });

    it("si ejecuto la funcion getUserTokenFrom, retorna un objeto con la propiedad name con last_name", function () {
        let user = {
            first_name: "Franco",
            last_name: "Perez",
            role: "admin",
            email: "test@test.com"
        }
        let resultado = UserDTO.getUserTokenFrom(user)
        expect(resultado).to.have.property("name")
        expect(resultado.name).to.include(user.last_name)
    });

    it("si ejecuto la funcion getUserTokenFrom, retorna un objeto con la propiedad email", function () {
        let user = {
            first_name: "Franco",
            last_name: "Perez",
            role: "admin",
            email: "test@test.com"
        }
        let resultado = UserDTO.getUserTokenFrom(user)
        expect(resultado).to.have.property("email")
        expect(resultado.email).to.eq(user.email)
    });

    it("si ejecuto la funcion getUserTokenFrom, retorna un objeto que contiene un valor en la propiedad name", function () {
        let user = {
            first_name: "Franco",
            last_name: "Perez",
            role: "admin",
            email: "test@test.com"
        }
        let resultado = UserDTO.getUserTokenFrom(user)
        expect(resultado).to.have.property("name")
        expect(resultado.name).to.not.be.empty

    });

    it("si ejecuto la funcion getUserTokenFrom, retorna un objeto que contiene un valor en la propiedad role", function () {
        let user = {
            first_name: "Franco",
            last_name: "Perez",
            role: "admin",
            email: "test@test.com"
        };
        let resultado = UserDTO.getUserTokenFrom(user);
        expect(resultado).to.have.property("role");
        expect(resultado.role).to.not.be.empty;
    });

    it("si ejecuto la funcion getUserTokenFrom, retorna un objeto que contiene un valor en la propiedad email", function () {
        let user = {
            first_name: "Franco",
            last_name: "Perez",
            role: "admin",
            email: "test@test.com"
        };
        let resultado = UserDTO.getUserTokenFrom(user);
        expect(resultado).to.have.property("email");
        expect(resultado.email).to.not.be.empty;
    });

});