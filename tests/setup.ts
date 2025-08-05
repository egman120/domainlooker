// Global test setup
import { jest } from '@jest/globals';

// Mock console methods during tests to reduce noise
const originalConsoleLog = console.log;
const originalConsoleError = console.error;

beforeAll(() => {
  // Mock console.log and console.error during tests
  console.log = jest.fn();
  console.error = jest.fn();
});

afterAll(() => {
  // Restore original console methods
  console.log = originalConsoleLog;
  console.error = originalConsoleError;
});

// Set longer timeout for network operations
jest.setTimeout(30000);