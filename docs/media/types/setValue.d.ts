/**
 * Set a value on the context object by path, will build the object as it goes
 *
 * *nb not idempotent will change the value passed in, see below for idempotent call
 *
 * @param rootContext context object to set value on
 * @param path property path to value
 * @param value value to set
 * @returns the root context again (for convenience)
 *
 * @example ```
 * const data = {};
 * setValue(data, 'p[0].p', 'v');
 *
 * ==> data : { p: [{ p: 'v' }] }
 *
 * // get a new object, idempotent call
 * const data = {};
 * const newData = setValue({...data}, 'p[0].p', 'v');
 *
 * ==> data : { }
 * ==> newData : { p: [{ p: 'v' }] }
 *
 * ```
 */
export declare function setValue(rootContext: any, path: string, value: any): any;
