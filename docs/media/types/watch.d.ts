import { IWatchHandler } from './IWatchHandler';
export declare function watch(o: any, property: string, handler: IWatchHandler, once?: boolean): () => void;
