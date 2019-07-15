"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
const express_1 = __importDefault(require("express"));
const utils_1 = require("./utils");
const routes_1 = __importDefault(require("./services/routes"));
const middleware_1 = __importDefault(require("./middleware"));
const errorHandlers_1 = __importDefault(require("./middleware/errorHandlers"));
const config_1 = __importDefault(require("./config"));
process.on("uncaughtException", e => {
    console.log(e);
    process.exit(1);
});
process.on("unhandledRejection", e => {
    console.log(e);
    process.exit(1);
});
const app = express_1.default();
utils_1.applyMiddleware(middleware_1.default, app);
utils_1.applyRoutes(routes_1.default, app);
utils_1.applyMiddleware(errorHandlers_1.default, app);
const PORT = config_1.default.PORT;
const server = http_1.default.createServer(app);
server.listen(PORT, () => console.log(`Server is running http://localhost:${PORT}...`));
//# sourceMappingURL=app.js.map