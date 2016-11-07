import { MonteError } from './MonteError';
export class MonteOptionError extends MonteError {
  static RequiredOption(optionName) {
    return new MonteError(`Option "${optionName}" is required.`);
  }

  static InvalidEnumOption(optionName, badValue) {
    return new MonteError(`Option "${optionName}" must be set to a valid option. The value "${badValue}" is not valid.`);
  }
}
