import { INTERACTION_EVENTS } from '../const/events';

export function commonEventNames(...leads) {
  const names = [];

  for (let i = 0; i < leads.length; i++) {
    const lead = leads[i];

    for (const eventName of INTERACTION_EVENTS) {
      names.push(`${lead}:${eventName}`);
    }
  }

  return names;
}
