import { MonteError } from './MonteError';
export class MonteOptionError extends MonteError {
  static RequiredOption(optionName, ...msgs) {
    return new MonteOptionError(`Option "${optionName}" is required.`, ...msgs);
  }

  static InvalidEnumOption(optionName, badValue, ...msgs) {
    return new MonteOptionError(`Option "${optionName}" must be set to a valid option. The value "${badValue}" is not valid.`, ...msgs);
  }

  static OptionMustBeFunction(optionName, ...msgs) {
    return new MonteOptionError(`Option "${optionName}" must be a function.`, ...msgs);
  }
}
