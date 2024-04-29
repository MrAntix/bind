/** @internal
 * Get the corresponding member name for a given attribute name
 * (ie snake=>camel case)
 *
 * @param attributeName Attribute name
 */
export function getBindingMemberName(attributeName) {
    return (memberMap[attributeName] ||
        attributeName.replace(/(-\w)/g, function (match) {
            return match[1].toUpperCase();
        }));
}
const memberMap = {
    'inner-html': 'innerHTML'
};
//# sourceMappingURL=getBindingMemberName.js.map