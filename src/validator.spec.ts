import { validator, setErrorMessage } from './validator';

const VALIDATOR_TYPE = 'ARRAY_REQUIRED';
const DEFAULT_MESSAGE = 'The list should have items';

describe('fonk-array-required-validator specs', () => {
  it('should return succeeded validation when it feeds value equals undefined', () => {
    // Arrange
    const value = void 0;

    // Act
    const result = validator({ value });

    // Assert
    expect(result).toEqual({
      succeeded: true,
      message: '',
      type: VALIDATOR_TYPE,
    });
  });

  it('should return succeeded validation when it feeds value equals null', () => {
    // Arrange
    const value = null;

    // Act
    const result = validator({ value });

    // Assert
    expect(result).toEqual({
      succeeded: true,
      message: '',
      type: VALIDATOR_TYPE,
    });
  });

  it('should return succeeded validation when it feeds value equals empty string', () => {
    // Arrange
    const value = '';

    // Act
    const result = validator({ value });

    // Assert
    expect(result).toEqual({
      succeeded: true,
      message: '',
      type: VALIDATOR_TYPE,
    });
  });

  it('should overwrite default message when it feeds value and message', () => {
    // Arrange
    const value = 'test';
    const message = 'other message';

    // Act
    const result = validator({ value, message });

    // Assert
    expect(result).toEqual({
      succeeded: false,
      message: 'other message',
      type: VALIDATOR_TYPE,
    });
  });

  it('should return failed validation when type of feeds value is string', () => {
    // Arrange
    const value = 'test';

    // Act
    const result = validator({
      value,
    });

    // Assert
    expect(result).toEqual({
      succeeded: false,
      message: DEFAULT_MESSAGE,
      type: VALIDATOR_TYPE,
    });
  });

  it('should return failed validation when it feeds value is true', () => {
    // Arrange
    const value = true;

    // Act
    const result = validator({
      value,
    });

    // Assert
    expect(result).toEqual({
      succeeded: false,
      message: DEFAULT_MESSAGE,
      type: VALIDATOR_TYPE,
    });
  });

  it('should return failed validation when it feeds value is false', () => {
    // Arrange
    const value = false;

    // Act
    const result = validator({
      value,
    });

    // Assert
    expect(result).toEqual({
      succeeded: false,
      message: DEFAULT_MESSAGE,
      type: VALIDATOR_TYPE,
    });
  });

  it('should return failed validation when it feeds value is an object', () => {
    // Arrange
    const value = {};

    // Act
    const result = validator({
      value,
    });

    // Assert
    expect(result).toEqual({
      succeeded: false,
      message: DEFAULT_MESSAGE,
      type: VALIDATOR_TYPE,
    });
  });

  it('should return failed validation when it feeds value is a function', () => {
    // Arrange
    const value = () => null;

    // Act
    const result = validator({
      value,
    });

    // Assert
    expect(result).toEqual({
      succeeded: false,
      message: DEFAULT_MESSAGE,
      type: VALIDATOR_TYPE,
    });
  });

  it('should return succeeded validation when it feeds value is an array', () => {
    // Arrange
    const value = [];

    // Act
    const result = validator({
      value,
    });

    // Assert
    expect(result).toEqual({
      succeeded: false,
      message: DEFAULT_MESSAGE,
      type: VALIDATOR_TYPE,
    });
  });

  it('should return failed validation when it feeds value is an array but does not have the minimum number of elements allowed', () => {
    // Arrange
    const value = [1, 2, 3];

    // Act
    const result = validator({
      value,
      message: 'The value must be a list with {{minLength}} items at least',
      customArgs: {
        minLength: 5,
      },
    });

    // Assert
    expect(result).toEqual({
      succeeded: false,
      message: 'The value must be a list with 5 items at least',
      type: VALIDATOR_TYPE,
    });
  });

  it('should return failed validation when it feeds value is an array but it has more elements than the maximum allowed', () => {
    // Arrange
    const value = [1, 2, 3, 4, 5, 6];

    // Act
    const result = validator({
      value,
      message:
        'The value must be a list with a maximum of {{maxLength}} elements',
      customArgs: {
        maxLength: 5,
      },
    });

    // Assert
    expect(result).toEqual({
      succeeded: false,
      message: 'The value must be a list with a maximum of 5 elements',
      type: VALIDATOR_TYPE,
    });
  });

  it('should return succeeded validation when it feeds value is an array with a correct number of elements', () => {
    // Arrange
    const value = [1, 2, 3];

    // Act
    const result = validator({
      value,
      customArgs: {
        minLength: 2,
        maxLength: 4,
      },
    });

    // Assert
    expect(result).toEqual({
      succeeded: true,
      message: '',
      type: VALIDATOR_TYPE,
    });
  });

  it('should return succeeded validation when it feeds value is an array with a correct number of elements', () => {
    // Arrange
    const value = [1, 2, 3];

    // Act
    const result = validator({
      value,
      customArgs: {
        minLength: 3,
        maxLength: 3,
      },
    });

    // Assert
    expect(result).toEqual({
      succeeded: true,
      message: '',
      type: VALIDATOR_TYPE,
    });
  });

  it('should overwrite default message when it feeds value and calls to setErrorMessage', () => {
    // Arrange
    const value = 'test';

    setErrorMessage('other message');

    // Act
    const result = validator({ value });

    // Assert
    expect(result).toEqual({
      succeeded: false,
      message: 'other message',
      type: VALIDATOR_TYPE,
    });
  });
});
