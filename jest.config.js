const { jest: jestConfig } = require('./craco.config.js');

module.exports = {
    ...jestConfig,
    setupFilesAfterEnv: ['@testing-library/jest-dom'],
    testEnvironment: 'jsdom',
    transform: {
        "^.+\\.(js|jsx|ts|tsx)$": "babel-jest",
        '^.+\\.tsx?$': 'ts-jest',
    },
    transformIgnorePatterns: [
        "/node_modules/(?!react-leaflet)"
    ],
    moduleNameMapper: {
        "^@components/(.*)$": "<rootDir>/src/components/$1",
        "^@middleware/(.*)$": "<rootDir>/src/middleware/$1",
        "^@services/(.*)$": "<rootDir>/src/services/$1",
        "^@store/(.*)$": "<rootDir>/src/store/$1",
        "^@utils/(.*)$": "<rootDir>/src/utils/$1",
    }
};
