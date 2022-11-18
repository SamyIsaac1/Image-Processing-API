# Image Processing API

An API that can be used in two different ways. As a simple placeholder API, the first allows you to place images into your frontend with the size set via URL parameters for rapid prototyping. The second use case is as a library to serve properly scaled versions of your images to the front end to reduce page load size. Rather than needing to resize and upload multiple copies of the same image to be used throughout your site, the API you create will handle resizing and serving stored images for you.

# Usage
Simply navigate to the api/images route and provide the filename, width, height to resize and display the image.repeated images will be cached. 

# Development 
1. Using Express to create our app
2. using express.static to to serve all static Images.
3. Making use of the sharp package to resize and save the new image and creating custom middleware to manage validations and Creations
4. implementing unit tests in Jasmine to test endpoints and image creation.

# Installation

All dependencies that must be installed in order to set up the project 
```
Prettier and Eslint
$npm init
$npm i --save-dev prettier
$npm i --save-dev eslint
$npm i --save-dev eslint-config-prettier
$npm i --save-dev eslint-plugin-prettier

TypeScript
$npm i --save-dev typescript
$npm i --save-dev ts-node 
$npm i --save-dev @types/node
$npx tsc --init

Jasmine
$npm i jasmine 
$npm i jasmine-spec-reporter
$npm i --save-dev @types/jasmine

Express
$npm i express
$npm i --save-dev @types/express
$npm i --save-dev nodemon
```