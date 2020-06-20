const messageCreate = (message, attribute) => typeof message === 'string'
    ? message.trim() === ''
        ? `${attribute} was not valid!`
        : message
    : typeof message === 'function'
        ? `${attribute} ${typeof message() === 'string'
            ? message()
            : 'was not valid!'
        }`
        : `${attribute} was not valid!`;


const methods = {
    length: ({ attribute, min, max, message, value }) => {
        const [minIsNum,,maxIsNum,, valueIsNum] = [
            ...methods.isNumber(min), ...methods.isNumber(max),
            ...methods.isNumber(value)
        ];
        if (minIsNum && maxIsNum && valueIsNum) {
            const msg = messageCreate(
                message
                || `must be more than ${min} and less than ${max} letters!`,
                attribute
            );
            const valueNum = value.trim().length;
            return valueNum >= Number(min) && valueNum <= Number(max)
                ? null
                : msg;
        }
        return `Error Occurred while validating ${attrubute}`;
    },
    isNumber: ({ attribute, value, message }) => {
        const msg = messageCreate(message, attribute);
        return !Object.is(Number(value), NaN)
            ? null
            : msg;
    },
    isString: ({ attribute, value, message }) => {
        const msg = messageCreate(message, attribute);
        const result = typeof value === 'string' && value.trim() !== ''
            ? null
            : msg;
        return result;
    },
    customFormat: ({ parser, attribute, value, message }) => {
        if (typeof parser === 'function') {
            return null;
        }
        const msg = messageCreate(message, attribute);
        try {
        const result = parser(value);
        return result === true || result === null || result === undefined
            ? false
            : msg;
        } catch {
            return msg;
        }
    },

};

const testForAttribute = function factory(attribute, value, constraints) {
    const constraintsForAttribute = constraints[attribute];
    const result = Object.keys(constraintsForAttribute).map(key => methods[key](
        { value, ...constraintsForAttribute[key], attribute }
    )).filter((result) => result !== null);
    return result.length === 0
    ? null
    : {
        [attribute]: result
    };
}

const validate = function validate(attributes, constraints, options) {
    const results = Object.entries(attributes).map(([attribute, value]) =>
        testForAttribute(attribute, value, constraints)
    ).filter((item) => item !== null);

    return results;
};

/**
 * removes undefined 
 * @param {object} attributes 
 * @param {object} model 
 * @returns {object} sanitisedObject
 */
const sanitise = function sanitise(attributes, model) {
    return Object.entries(model).reduce((obj, [key, value]) => {
        return typeof attributes?.[key] === typeof value
        ? { ...obj, [key]: attributes[key] } : obj;
    }, {});
}

console.log(validate(
    { 'first name': 's   ' },
    { 'first name': {
        isString: true,
        length: {
            min: 2, max: 10, message: () => "not valid !!!"
        }
    } }
));

const t = sanitise({ bla: 'dfsd', bloo: '', chhh: 'dsads' }, { bloo: String(), bla: String() })

console.log(t);