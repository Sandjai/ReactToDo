module.exports = {
    preset: 'react-native',
    setupFilesAfterEnv: ['<rootDir>/src/setupTests.js'],
    testEnvironment: 'jsdom',
    moduleNameMapper: {
      '^.+\\.(css|less|sass|scss)$$': 'identity-obj-proxy',
    },
  };