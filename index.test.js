//Learning Jest.  This is just the main file to use
//for testing functions declared in index.js


const { sum } = require('./index');

test('adds 1 + 2 to equal 3', () => {
    expect(sum(1, 2)).toBe(3);
});