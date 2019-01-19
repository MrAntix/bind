import { getBindingMemberName } from './getBindingMemberName.js';
/** @internal
 * Get all the attribute bindings on the given element
 *
 * @param exp Expression used to find attributes to bind to
 * @param element Element to be bound
 * @param attributeNames names of attibutes on the element
 */
export function getBindings(exp, element, attributeNames) {
    return attributeNames
        .map(attributeName => ({
        attributeName,
        bindingAttributeName: (exp.exec(attributeName) || [])[1]
    }))
        .filter(d => !!d.bindingAttributeName)
        .map(d => ({
        componentMemberName: getBindingMemberName(d.bindingAttributeName),
        contextMemberName: element.getAttribute(d.attributeName)
    }));
}
