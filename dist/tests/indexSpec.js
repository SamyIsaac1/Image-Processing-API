'use strict';
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator['throw'](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const validator_1 = __importDefault(require('./../utilities/validator'));
const supertest_1 = __importDefault(require('supertest'));
const index_1 = __importDefault(require('../index'));
const request = (0, supertest_1.default)(index_1.default);
describe('Test endpoint  response', () => {
  it('gets the api/images endpoint', () =>
    __awaiter(void 0, void 0, void 0, function* () {
      const response = yield request.get('/api/images');
      expect(response.status).toBe(200);
    }));
});
describe('Image transform function should reslove or reject', () => {
  it('Expect transform to not throw error', () =>
    __awaiter(void 0, void 0, void 0, function* () {
      // Change height and width to create a new image
      const newImg = yield validator_1.default.createImg('fjord', 100, 100);
      expect(newImg).toBe('An Image has created');
    }));
  it('Expect transform to throw specific error', () =>
    __awaiter(void 0, void 0, void 0, function* () {
      // the image is already exist
      const newImg = yield validator_1.default.createImg('fjord', 200, 200);
      expect(newImg).toEqual('Image exists');
    }));
});
