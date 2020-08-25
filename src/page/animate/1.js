function createMyOwnObj() {
    //想把所有的key都变成函数，或者Promise,或者anything
    return new Proxy({}, {
        get(target, propKey, receiver) {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    let randomBoolean = Math.random() > 0.5;
                    let Message;
                    if (randomBoolean) {
                        Message = `你的${propKey}运气不错，成功了`;
                        resolve(Message);
                    } else {
                        Message = `你的${propKey}运气不行，失败了`;
                        reject(Message);
                    }
                }, 1000);
            });
        }
    });
}

let myOwnObj = createMyOwnObj();

myOwnObj.hahaha.then(result => {
    console.log(result) //你的hahaha运气不错，成功了
}).catch(error => {
    console.log(error) //你的hahaha运气不行，失败了
})

myOwnObj.wuwuwu.then(result => {
    console.log(result) //你的wuwuwu运气不错，成功了
}).catch(error => {
    console.log(error) //你的wuwuwu运气不行，失败了
})
myOwnObj.ss.then(result => {
    console.log(result) //你的wuwuwu运气不错，成功了
}).catch(error => {
    console.log(error) //你的wuwuwu运气不行，失败了
})