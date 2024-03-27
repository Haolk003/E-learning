"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mongoConnect = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const mongoConnect = async () => {
    try {
        await mongoose_1.default.connect(`${process.env.MONGOOSE_CONNECT}`).then((data) => {
            console.log(`Database connect with ${data.connection.host}`);
        });
    }
    catch (err) {
        console.log(err);
        setTimeout(exports.mongoConnect, 5000);
    }
};
exports.mongoConnect = mongoConnect;
