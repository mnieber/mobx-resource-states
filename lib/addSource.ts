import { ConditionT, getRS } from './ResourceState';
import { removeSource } from './removeSource';

export type ArgsT = {
  states?: {
    [state: string]: any[];
  };
  condition: ConditionT;
  name: string;
  data?: any;
};

export const addSource = (args: ArgsT) => {
  for (const pair of Object.entries(args.states ?? {})) {
    const state = pair[0];
    const resources = pair[1];
    for (const resource of resources) {
      const rs = getRS(resource);
      rs.addSource({
        state,
        condition: args.condition,
        name: args.name,
        data: args.data,
      });
    }
  }
  return () => removeSource({ states: args.states, name: args.name });
};
