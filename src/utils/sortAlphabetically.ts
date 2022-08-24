export const sortAlphabetically = (nameA: string, nameB: string) => {
  if (nameA < nameB) {
    return -1;
  }
  if (nameA > nameB) {
    return 1;
  }
  return 0;
};
