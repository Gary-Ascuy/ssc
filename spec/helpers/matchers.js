beforeEach(() => {
  jasmine.addMatchers({
    toBeExample() {
      const compare = (actual, expected) => {
        const pass = actual === expected && isNaN (actual)
        return {pass};
      };
      return {compare};
    }
  });
});
