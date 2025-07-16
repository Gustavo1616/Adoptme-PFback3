import PetDTO from "../dto/Pet.dto.js";
import { CustomError } from "../services/errors/custom.error.js";
import { errorDictionary } from "../services/errors/EErrors.js";
import { petsService } from "../services/index.js"
import __dirname from "../utils/index.js";
import logger from "../utils/logger.js";

const getAllPets = async (req, res, next) => {
    try {
        const pets = await petsService.getAll();
        res.send({ status: "success", payload: pets })
    } catch (error) {
        next(error);
    }
}

const createPet = async (req, res, next) => {
    try {
        const { name, specie, birthDate } = req.body;
        if (!name || !specie || !birthDate) {
            CustomError.generateError(
                'MissingPetFields',
                errorDictionary.pet.MISSING_FIELDS.message,
                `Los campos obligatorios (nombre, especie, fecha de nacimiento) faltan en el cuerpo de la solicitud.`,
                errorDictionary.pet.MISSING_FIELDS.statusCode
            );
        }
        const pet = PetDTO.getPetInputFrom({ name, specie, birthDate });
        const result = await petsService.create(pet);
        res.status(201).send({ status: "success", payload: result });
    } catch (error) {
        next(error);
    }
};

const updatePet = async (req, res, next) => {
    try {
        const petUpdateBody = req.body;
        const petId = req.params.pid;
        if (!petId) {
            CustomError.generateError(
                'InvalidPetId',
                errorDictionary.general.BAD_REQUEST.message,
                `El ID de mascota proporcionado es inválido o nulo.`,
                errorDictionary.general.BAD_REQUEST.statusCode,
            );
        }
        const existingPet = await petsService.getBy({ _id: petId });
        if (!existingPet) {
            CustomError.generateError(
                "PetNotFound",
                errorDictionary.pet.NOT_FOUND.message,
                { petId: petId },
                errorDictionary.pet.NOT_FOUND.statusCode,
            );
        }
        const result = await petsService.update(petId, petUpdateBody);
        if (!result) {
            CustomError.generateError(
                "PetUpdateFailed",
                "No se pudo actualizar la mascota.",
                `La operación de actualización para la mascota con ID ${petId} falló sin un error explícito.`,
                errorDictionary.general.SERVER_ERROR.statusCode,
            );
        }
        res.send({ status: "success", message: "Mascota actualizada exitosamente" });
    } catch (error) {
        next(error);
    }
};

const deletePet = async (req, res, next) => {
    try {
        const petId = req.params.pid;
        if (!petId) {
            CustomError.generateError(
                'InvalidPetId',
                errorDictionary.general.BAD_REQUEST.message,
                `El ID de mascota proporcionado es inválido o nulo.`,
                errorDictionary.general.BAD_REQUEST.statusCode
            );
        }
        const result = await petsService.delete(petId);
        if (!result) {
            CustomError.generateError(
                'PetNotFound',
                errorDictionary.pet.NOT_FOUND.message,
                { petId: petId },
                errorDictionary.pet.NOT_FOUND.statusCode
            );
        }
        res.send({ status: "success", message: "pet deleted" });
    } catch (error) {
        next(error);
    }
}

const createPetWithImage = async (req, res, next) => {
    try {
        const file = req.file;
        const { name, specie, birthDate } = req.body;
        if (!name || !specie || !birthDate) {
            CustomError.generateError(
                'MissingPetFields',
                errorDictionary.pet.MISSING_FIELDS.message,
                `Los campos obligatorios (nombre, especie, fecha de nacimiento) faltan en el cuerpo de la solicitud.`,
                errorDictionary.pet.MISSING_FIELDS.statusCode,
            );
        }
        if (!file) {
            CustomError.generateError(
                'ImageUploadError',
                'No se ha subido ninguna imagen para la mascota.',
                `Se requiere un archivo de imagen para la mascota, pero no se proporcionó ninguno.`,
                errorDictionary.general.BAD_REQUEST.statusCode,
            );
        }
        const pet = PetDTO.getPetInputFrom({
            name,
            specie,
            birthDate,
            image: `${__dirname}/../public/img/${file.filename}`
        });
        logger.info(pet);
        const result = await petsService.create(pet);
        res.status(201).send({ status: "success", payload: result });
    } catch (error) {
        next(error);
    }
};
export default {
    getAllPets,
    createPet,
    updatePet,
    deletePet,
    createPetWithImage
}