const createAction = (type, ...argNames) => {
    return (...args) => {
        let action = { type };
        argNames.forEach((arg, index) => {
            action[argNames[index]] = args[index]
        });
        return action;
    }
};
console.log(createAction('add', 'name', 'age')('wuchao', 23))