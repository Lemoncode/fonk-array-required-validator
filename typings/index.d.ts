import { FieldValidationFunctionSync } from '@lemoncode/fonk';

export namespace arrayRequired {
  export const validator: FieldValidationFunctionSync;
  export function setErrorMessage(message: string | string[]): void;
}
