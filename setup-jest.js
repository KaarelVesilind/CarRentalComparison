const matchers = require("jest-expect-message");
expect.extend(matchers);

afterEach(() => {
  jest.useRealTimers();
});

const config = {
  setupFilesAfterEnv: ["jest-expect-message"],
};

// eslint-disable-next-line no-undef
module.exports = config;
