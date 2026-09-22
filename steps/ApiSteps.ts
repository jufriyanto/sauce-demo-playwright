import { createBdd } from 'playwright-bdd';
import { expect, APIResponse } from '@playwright/test';

const { When, Then } = createBdd();

let apiResponse: APIResponse;

When('I send a GET request to {string}', async ({ request }, endpoint: string) => {
  apiResponse = await request.get(`https://reqres.in${endpoint}`);
});

When('I send a POST request to {string} with name {string} and job {string}', async ({ request }, endpoint: string, name: string, job: string) => {
  apiResponse = await request.post(`https://reqres.in${endpoint}`, {
    data: { name, job },
  });
});

When('I send a PUT request to {string} with name {string} and job {string}', async ({ request }, endpoint: string, name: string, job: string) => {
  apiResponse = await request.put(`https://reqres.in${endpoint}`, {
    data: { name, job },
  });
});

When('I send a DELETE request to {string}', async ({ request }, endpoint: string) => {
  apiResponse = await request.delete(`https://reqres.in${endpoint}`);
});

Then('the response status should be {int}', async ({}, status: number) => {
  expect(apiResponse.status()).toBe(status);
});

Then('the response should contain a list of users', async () => {
  const body = await apiResponse.json();
  expect(Array.isArray(body.data)).toBe(true);
  expect(body.data.length).toBeGreaterThan(0);
});

Then('the user email should be {string}', async ({}, email: string) => {
  const body = await apiResponse.json();
  expect(body.data.email).toBe(email);
});

Then('the response should contain name {string}', async ({}, name: string) => {
  const body = await apiResponse.json();
  expect(body.name).toBe(name);
});

Then('the response should contain job {string}', async ({}, job: string) => {
  const body = await apiResponse.json();
  expect(body.job).toBe(job);
});
