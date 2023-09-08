export type OptionsT = {
  logging: boolean;
  log: (...args: any[]) => void;
};

export const options: OptionsT = {
  logging: false,
  log: console.log,
};

export const getOptions = () => options;

export const setOptions = (moreOptions: OptionsT) => {
  Object.assign(options, moreOptions);
};
