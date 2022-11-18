import express from 'express';
import sharp from 'sharp';
import fs from 'fs';

const createImg = async (
  filename: String,
  width: number,
  height: number
): Promise<string> => {
  const images: string[] = [...fs.readdirSync('./assets')];
  const img = `${filename}_${width}_${height}.jpg`;

  if (images.includes(img)) {
    return 'Image exists';
  }

  const inputBuffer = `assets/${filename}.jpg`;
  await sharp(inputBuffer).resize(width, height).toFile(`assets/${img}`);
  return 'An Image has created';
};

const validator = async (
  req: express.Request,
  res: express.Response,
  next: Function
): Promise<void> => {
  // https://nodejs.org/api/fs.html#fsreaddirsyncpath-options
  // Reads the contents of the directory.
  const images: string[] = [...fs.readdirSync('./assets')];
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
    try {
      
      // 3. filename ,width and Height are provided
      const img = `${filename}_${width}_${height}.jpg`;
  
      // the Image is Already Created
      if (images.includes(img)) {
        res.locals.output = `<div style="background:#0c0c0e;height:100%;text-align: center;padding-top: 100px;"><img src=http://localhost:3000/images/${img}></div>`;
      } else {
        // A new Height and Width
        // Create a new Image
        await createImg(String(filename), Number(width), Number(height));
        res.locals.output = `<div style="background:#0c0c0e;height:100%;text-align: center;padding-top: 100px;"><img src=http://localhost:3000/images/${img}></div>`;
      }
    } catch (error) {
      res.locals.output = `<div style="text-align:center;"><h1 style="color:red;">Please Provide Correct Queries</h1><h2 style="color:blue;"> ex: "/api/images/?filename=fjord&width=300&height=300"</h2></div>`;
    }
  }
  next();
};
export default { validator, createImg };
