const NodeCache = require('node-cache');

const nodeCache = new NodeCache();
const secondsInADay = 24 * 60 * 60;
module.exports = {
  setCache: (key, value) => nodeCache.set(key, value, secondsInADay),
  getCache: (key) => {
    const response = nodeCache.get(key);
    return response === undefined ? false : response;
  },
  clearData: () => nodeCache.flushAll(),
  delWithKey: key => nodeCache.del(`*${key}*`),
};
