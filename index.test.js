//Learning Jest.  This is just the main file to use
//for testing functions declared in index.js

//imports
const { sum, fetchData } = require('./index');


/*******************************
 * 
 * Matchers
 * 
 *******************************/

//tobe
test('adds 1 + 2 to equal 3', () => {
    expect(sum(1, 2)).toBe(3);
    expect(sum(2, 2)).toBe(4);
});

//toEqual
test('object assignment', () => {
    const data = {one: 1};
    data['two'] = 2;
    expect(data).toEqual({one: 1, two: 2});
  });

  //not
  test('adding positive numbers is not zero', () => {
    for (let a = 1; a < 10; a++) {
      for (let b = 1; b < 10; b++) {
        expect(a + b).not.toBe(0);
      }
    }
  });

  //null, undefined, defined, true, false, 0
  test('null', () => {
    const n = null;
    expect(n).toBeNull();
    expect(n).toBeDefined();
    expect(n).not.toBeUndefined();
    expect(n).not.toBeTruthy();
    expect(n).toBeFalsy();
  });

  test('zero', () => {
    const z = 0;
    expect(z).not.toBeNull();
    expect(z).toBeDefined();
    expect(z).not.toBeUndefined();
    expect(z).not.toBeTruthy();
    expect(z).toBeFalsy();
  });

  //numbers
  test('two plus two', () => {
    const value = 2 + 2;
    expect(value).toBeGreaterThan(3);
    expect(value).toBeGreaterThanOrEqual(3.5);
    expect(value).toBeLessThan(5);
    expect(value).toBeLessThanOrEqual(4.5);
  
    // toBe and toEqual are equivalent for numbers
    expect(value).toBe(4);
    expect(value).toEqual(4);
  });

  //floating point numbers have rounding errors when using
  //toEqual or tobe.  So use toBeCloseTo instead
  test('adding floating point numbers', () => {
    const value = 0.1 + 0.2;
    //expect(value).toBe(0.3);           This won't work because of rounding error
    expect(value).toBeCloseTo(0.3); // This works.
  });

  //strings use toMatch
  test('there is no I in team', () => {
    expect('team').not.toMatch(/I/);
    expect('Christoph').toMatch(/stop/);
  });

  //arrays and iterables use toContain
  const shoppingList = [
    'diapers',
    'kleenex',
    'trash bags',
    'paper towels',
    'milk',
  ];
  
  test('the shopping list has milk on it', () => {
    expect(shoppingList).toContain('milk');
    expect(new Set(shoppingList)).toContain('milk');
  });

  //exceptions/errors use toThrow
  function compileAndroidCode() {
    throw new Error('you are using the wrong JDK');
  }
  
  test('compiling android goes as expected', () => {
    expect(() => compileAndroidCode()).toThrow();
    expect(() => compileAndroidCode()).toThrow(Error);
  
    // You can also use the exact error message or a regexp
    expect(() => compileAndroidCode()).toThrow('you are using the wrong JDK');
    expect(() => compileAndroidCode()).toThrow(/JDK/);
  });


/*******************************
 * 
 * Async Code
 * 
 *******************************/

//Non async
test('the data is Peanut Butter', () => {
    return fetchData('/pb').then(data => {
      expect(data).toBe('Peanut Butter');
    });
  });

  //Async await
  test('the data is Peanut Butter', async () => {
    const data = await fetchData('/pb');
    expect(data).toBe('Peanut Butter');
  });
  
  test('the fetch fails with an error', async () => {
    expect.assertions(1);
    try {
      await fetchData();
    } catch (e) {
      expect(e).toMatch('error');
    }
  });

  test('the data is peanut butter', async () => {
    await expect(fetchData('/pb')).resolves.toBe('Peanut Butter');
  });
  
  test('the fetch fails with an error', async () => {
    await expect(fetchData()).rejects.toMatch('error');
  });

  test('the fetch fails with an error', () => {
    expect.assertions(1);
    return fetchData().catch(e => expect(e).toMatch('error'));
  });

  //Callbacks