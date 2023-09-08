import { action, makeAutoObservable } from 'mobx';
import { addSource } from './addSource';
import { v4 as uuidv4 } from 'uuid';

export type TrackerT<T> = {
  isRunning: boolean;
  data: { [key: string]: any } | undefined;
  id: string;
  result: Promise<T>;
};

export type ArgsT<T> = {
  promise: Promise<T>;
  name: string;
  states?: {
    [state: string]: any[];
  };
};

export const trackPromise = <T = any>(args: ArgsT<T>) => {
  const tracker: TrackerT<T> = makeAutoObservable({
    isRunning: true,
    data: undefined,
    id: uuidv4(),
    result: undefined as unknown as Promise<T>,
  });

  const removeSource = addSource({
    states: args.states,
    condition: () => tracker.isRunning,
    name: `${args.name}_${uuidv4()}`,
  });

  tracker.result = args.promise
    .then(
      action((response: any) => {
        tracker.isRunning = false;
        tracker.data = response;
        removeSource();
        return response;
      })
    )
    .catch(
      action((error: any) => {
        tracker.isRunning = false;
        removeSource();
        throw error;
      })
    );

  return tracker;
};
