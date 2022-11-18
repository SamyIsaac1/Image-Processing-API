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
const sharp_1 = __importDefault(require('sharp'));
const fs_1 = __importDefault(require('fs'));
const createImg = (filename, width, height) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const images = [...fs_1.default.readdirSync('./assets')];
    const img = `${filename}_${width}_${height}.jpg`;
    if (images.includes(img)) {
      return 'Image exists';
    }
    const inputBuffer = `assets/${filename}.jpg`;
    yield (0, sharp_1.default)(inputBuffer)
      .resize(width, height)
      .toFile(`assets/${img}`);
    return 'An Image has created';
  });
const validator = (req, res, next) =>
  __awaiter(void 0, void 0, void 0, function* () {
    // https://nodejs.org/api/fs.html#fsreaddirsyncpath-options
    // Reads the contents of the directory.
    const images = [...fs_1.default.readdirSync('./assets')];
    const [filename, width, height] = [
      req.query.filename,
      req.query.width,
      req.query.height,
    ];
    // Edge Cases
    // 1. No filename provided
    if (!req.query.filename) {
      res.locals.output = `<h1>Please Provide Queries</h1>
    <ol><li>filename  ex:
          <ul>
            <li>encenadaport</li>
            <li>fjord</li>
            <li>icelandwaterfall</li>
            <li>palmtunnel</li>
            <li>santamonica</li>
          </ul>
        </li>
        <li>width</li>
        <li>height</li>
      </ol>`;
    } else if (filename && (!width || !height)) {
      // 2. Filename provided but without both width and height
      //  or one of them is provided then display the original image
      const img = `${filename}.jpg`;
      res.locals.output = images.includes(img)
        ? `<div style="background:#0c0c0e;height:100%;text-align: center;"><img src=http://localhost:3000/images/${img}></div>`
        : '<h1 style="color:red;">Please provide Correct Parameters</h1>';
    } else {
      // 3. filename ,width and Height are provided
      const img = `${filename}_${width}_${height}.jpg`;
      // the Image is Already Created
      if (images.includes(img)) {
        res.locals.output = `<div style="background:#0c0c0e;height:100%;text-align: center;padding-top: 100px;"><img src=http://localhost:3000/images/${img}></div>`;
      } else {
        // A new Height and Width
        // Create a new Image
        yield createImg(String(filename), Number(width), Number(height));
        res.locals.output = `<div style="background:#0c0c0e;height:100%;text-align: center;padding-top: 100px;"><img src=http://localhost:3000/images/${img}></div>`;
      }
    }
    next();
  });
exports.default = { validator, createImg };
