const Validator = require('../Validator');
const expect = require('chai').expect;
const assert = require('assert');

describe('testing-configuration-logging/unit-tests', () => {
  describe('Validator', () => {
    it('валидатор проверяет строковые поля', () => {
      const validator = new Validator({
        name: {
          type: 'string',
          min: 10,
          max: 20,
        },
      });

      const errors = validator.validate({ name: 'Lalala' });

      expect(errors).to.have.length(1);
      expect(errors[0]).to.have.property('field').and.to.be.equal('name');
      expect(errors[0]).to.have.property('error').and.to.be.equal('too short, expect 10, got 6');
    });
    it('validates for number field', () => {
      const [min, max] = [18, 99];
      const validator = new Validator({
        age: {
          type: 'number',
          min: min,
          max: max,
        },
      });

      const errors = validator.validate({age: '35'});
      errors.push(validator.validate({age: -50})[0]);

      expect(errors).to.be.an('array').that.length(2);
      expect(errors[0]).to.have.property('error').and.to.be.equal('expect number, got string');
      expect(errors[1]).to.have.property('error').and.to.be.equal(`too little, expect ${min}, got -50`);
      assert.equal(validator.validate({age: 22}).length, 0);
    });
  });
});
