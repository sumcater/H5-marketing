function createMyOwnObj() {
    //想把所有的key都变成函数，或者Promise,或者anything
    return new Proxy({}, {
        get(target, propKey, receiver) {
            return new Promise((resolve, reject) => {

                resolve(Message);
                reject(Message);
                
            });
        }
    });
}

let myOwnObj = createMyOwnObj();