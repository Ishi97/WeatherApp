// src/test/Weather.test.js
import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import Weather from '../components/Weather';

beforeEach(() => {
  // Suppress console.error output during tests
  jest.spyOn(console, 'error').mockImplementation(() => {});
  global.fetch = jest.fn();
});

afterEach(() => {
  console.error.mockRestore();
  jest.resetAllMocks();
});

test('shows error message when no input is entered', () => {
  render(<Weather />);
  const button = screen.getByRole('button', { name: /search weather/i });
  fireEvent.click(button);
  expect(screen.getByRole('alert')).toHaveTextContent(
    'Please enter a city name.'
  );
});

test('displays error message when incorrect city is entered (API returns 404)', async () => {
  const errorResponse = { message: "City not found" };
  global.fetch.mockResolvedValueOnce({
    ok: false,
    status: 404,
    json: async () => errorResponse,
  });

  render(<Weather />);
  const input = screen.getByPlaceholderText(/enter a city name/i);
  fireEvent.change(input, { target: { value: 'IncorrectCity' }});
  
  const button = screen.getByRole('button', { name: /search weather/i });
  fireEvent.click(button);

  await waitFor(() => {
    expect(screen.getByRole('alert')).toHaveTextContent(
      "City not found. Please enter a valid city."
    );
  });
});

test('successful API call on button click displays temperature result', async () => {
  const fakeWeather = {
    name: 'ValidCity',
    main: { temp: 30 },
    weather: [{ description: 'sunny' }],
  };

  global.fetch.mockResolvedValueOnce({
    ok: true,
    status: 200,
    json: async () => fakeWeather,
  });

  render(<Weather />);
  const input = screen.getByPlaceholderText(/enter a city name/i);
  fireEvent.change(input, { target: { value: 'ValidCity' }});
  
  const button = screen.getByRole('button', { name: /search weather/i });
  fireEvent.click(button);

  // Verify the loading indicator is displayed.
  expect(screen.getByText(/loading weather data/i)).toBeInTheDocument();

  // Wait for the weather data to render and verify the temperature.
  await waitFor(() => {
    expect(screen.getByText(/weather in validcity/i)).toBeInTheDocument();
    // Use the parent <p> element for the temperature info.
    const tempParagraph = screen.getByText(/temperature:/i).closest('p');
    expect(tempParagraph).toHaveTextContent(/30/);
  });
});
