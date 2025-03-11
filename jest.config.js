import nextJest from "next/jest.js";

const createJestConfig = nextJest({
  dir: "./",
});

const customJestConfig = {
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  testEnvironment: "jest-environment-jsdom",
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1", // Adjust based on your alias settings
    "^.+\\.(css|scss|sass)$": "identity-obj-proxy", // Mock CSS imports
  },
};

export default createJestConfig(customJestConfig);
