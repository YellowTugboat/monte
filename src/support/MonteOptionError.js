import { MonteError } from './MonteError';
export class MonteOptionError extends MonteError {
  static RequiredOption(optionName) {
    return new MonteError(`Option "${optionName}" is required.`);
  }
}
