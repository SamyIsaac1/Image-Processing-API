'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const express_1 = __importDefault(require('express'));
const validator_1 = __importDefault(require('../../utilities/validator'));
const imgRoute = express_1.default.Router();
imgRoute.get('/', validator_1.default.validator, (req, res) => {
  res.send(res.locals.output);
});
exports.default = imgRoute;
