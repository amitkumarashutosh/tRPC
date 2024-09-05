"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@trpc/client");
// Pass AppRouter as generic here. 👇 This lets the `trpc` object know
// what procedures are available on the server and their input/output types.
const trpc = (0, client_1.createTRPCClient)({
    links: [
        (0, client_1.httpBatchLink)({
            url: 'http://localhost:3000',
            headers() {
                return __awaiter(this, void 0, void 0, function* () {
                    return {
                        Authorization: "Bearer 123" // 'Bearer ' + localStorage.get('token')
                    };
                });
            }
        }),
    ],
});
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        const createResponse = yield trpc.createTodo.mutate({
            title: "Hello World",
            description: "its a first programmer for beginner's"
        });
        console.log(createResponse);
        const getResponse = yield trpc.getTodo.query();
        console.log(getResponse);
        const signUpResponse = yield trpc.signUp.mutate({
            email: "amit@gmail.com",
            password: "amit"
        });
        console.log(signUpResponse);
    });
}
//Setup = follow tRPC docs
//step 1 = tsc-b or tsc to build .ts file into js 
//step 2 = node .\dist\server\index.js
//step 3 = node .\dist\client\index.js
//Note = Whenever make any changes in file run everthing from step 1 till 3
main();
