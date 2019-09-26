import {
  FieldValidationFunctionSync,
  parseMessageWithCustomArgs,
} from '@lemoncode/fonk';

const VALIDATOR_TYPE = 'ARRAY_REQUIRED';

let defaultMessage = 'The value must be an array';
export const setErrorMessage = message => (defaultMessage = message);

const defaultCustomArgs: CustomValidatorArgs = {
  minLength: 0,
};

const validateType = value => Array.isArray(value);

const validate = (value, args: CustomValidatorArgs) =>
  value.length >= args.minLength &&
  (args.maxLength ? value.length <= args.maxLength : true);

const isDefined = value => value !== void 0 && value !== null && value !== '';

interface CustomValidatorArgs {
  minLength?: number;
  maxLength?: number;
}

export const validator: FieldValidationFunctionSync<
  CustomValidatorArgs
> = fieldValidatorArgs => {
  const { value, message = defaultMessage, customArgs } = fieldValidatorArgs;

  const args: CustomValidatorArgs = {
    ...defaultCustomArgs,
    ...customArgs,
  };

  const succeeded =
    !isDefined(value) || (validateType(value) && validate(value, args));

  return {
    succeeded,
    message: succeeded
      ? ''
      : parseMessageWithCustomArgs(
          (message as string) || defaultMessage,
          customArgs
        ),
    type: VALIDATOR_TYPE,
  };
};
