import valid from './../utilities/validator';
import supertest from 'supertest';
import app from '../index';

const request = supertest(app);

describe('Test endpoint  response', () => {
  it('gets the api/images endpoint', async () => {
    const response = await request.get('/api/images');
    expect(response.status).toBe(200);
  });
});

describe('Image transform function should reslove or reject', () => {
  it('Expect transform to not throw error', async () => {
    // Change height and width to create a new image
    const newImg = await valid.createImg('fjord', 100, 100);
    expect(newImg).toBe('An Image has created');
  });

  it('Expect transform to throw specific error', async () => {
    // the image is already exist
    const newImg = await valid.createImg('fjord', 200, 200);
    expect(newImg).toEqual('Image exists');
  });
});
