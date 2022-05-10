import { splitPath } from './splitPath.js';
/**
 * gets a value from a context by property path
 *
 * @param context context object to get the value from
 * @param path property path to the value
 */
export function getValue(context, path) {
    const props = splitPath(path);
    for (var i = 0; i < props.length; i++) {
        if (context == null)
            return undefined;
        const prop = props[i];
        context = context[prop];
    }
    ;
    return context;
}
//# sourceMappingURL=getValue.js.map