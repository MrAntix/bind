import { IBinding } from './IBinding';
/** @internal
 * Get all the attribute bindings on the given element
 *
 * @param exp Expression used to find attributes to bind to
 * @param element Element to be bound
 * @param attributeNames names of attibutes on the element
 * @returns array of bindings
 */
export declare function getBindings(exp: RegExp, element: Element, attributeNames: string[]): IBinding[];
