import * as mainFlows from "./main";
import * as searchResultFlows from "./search-result";

const I = {
    ...mainFlows,
    ...searchResultFlows
}


function logger(flowName: string, fn: Function, ...args: any[]) {
    console.log(flowName, ...args);

    return fn(...args);
}

Object.keys(I).forEach((key) => {
    //@ts-ignore
    const tempFn = I[key];

    //@ts-ignore
    I[key] = async function (...args: any[]) {
        return logger("I " + key, () => tempFn.call(this, ...args), ...args);
    }
});

export { I };