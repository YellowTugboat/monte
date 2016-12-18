import { MonteError } from './MonteError';
export class MonteOptionError extends MonteError {
  static RequiredOption(optionName, ...msgs) {
    return new MonteError(`Option "${optionName}" is required.`, ...msgs);
  }

  static InvalidEnumOption(optionName, badValue, ...msgs) {
    return new MonteError(`Option "${optionName}" must be set to a valid option. The value "${badValue}" is not valid.`, ...msgs);
  }
}
