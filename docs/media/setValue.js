import { splitPath } from './splitPath';
/**
 * Set a value on the context object by path
 *
 * @example setValue(data, 'p[0].p', 'v');
 *
 * @param context context object to set value on
 * @param path property path to value
 * @param value value to set
 */
export function setValue(context, path, value) {
    const props = splitPath(path);
    let prop;
    for (var i = 0; i < props.length; i++) {
        prop = props[i];
        if (i < props.length - 1) {
            context = context[prop] == null
                ? (context[prop] = Number.isInteger(props[i + 1]) ? [] : {})
                : context[prop];
        }
        else {
            context[prop] = value;
        }
    }
    ;
}
