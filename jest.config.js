// eslint-disable-next-line no-undef
module.exports = {
    transform: {
        '^.+\\.vue$': 'vue-jest',
        '^.+\\.jsx?$': 'babel-jest',
        '^.+\\.ts$': 'ts-jest'
    },
    testMatch: ['**/?(*.)+(spec).[jt]s?(x)'],
    collectCoverage: true,
    coverageReporters: ['json', 'html']
};
