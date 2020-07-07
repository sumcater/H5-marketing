
const context = require.context("./modules", true, /.js$/);

export default context.keys().reduce((m, n) => {
    m = { ...m, ...context(n).default };
    return m;
}, {});
