export default {
    DebounceThrottle(handler, delay) {
        let startTime = new Date().getTime();
        let timer = null;
        return function () {
            let currentTime = new Date().getTime();
            if (currentTime - startTime > delay) {    // 节流 (如果时间段到了，则执行回调)
                clearTimeout(timer);
                startTime = new Date().getTime();
                handler.apply(this, arguments);
            } else {    // 防抖 (时间端没有到，记录最后一次，delay后调用回调)
                clearTimeout(timer);
                timer = setTimeout(() => {
                    startTime = new Date().getTime();
                    handler.apply(this, arguments);
                }, delay);
            }
        }
    }
}