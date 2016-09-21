export function commonEventNames(...leads) {
  const names = [];

  for (let i = 0; i < leads.length; i++) {
    const lead = leads[i];
    names.push(`${lead}:mouseover`);
    names.push(`${lead}:mouseout`);
    names.push(`${lead}:click`);
    names.push(`${lead}:touchstart`);
  }

  return names;
}
