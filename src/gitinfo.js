var stackTrace = require('stack-trace'),
    path = require('path');

/**
 * @see http://nodejs.org/docs/v0.11.14/api/all.html#all_require
 * @see http://stackoverflow.com/questions/9210542/node-js-require-cache-possible-to-invalidate/11477602
 */
module.exports = function requireNew (module) {
    var dirName,
        modulePath,
        cachedModule,
        newModule;

    // @see http://nodejs.org/api/modules.html
    if (module.indexOf('../') === 0 || module.indexOf('./') === 0) {
        dirName = path.dirname(stackTrace.get()[1].getFileName());

        module = dirName + '/' + module;
    }

    modulePath = require.resolve(module);

    cachedModule = require.cache[modulePath];

    delete require.cache[modulePath];

    newModule = require(modulePath);

    if (cachedModule) {
        require.cache[modulePath] = cachedModule;
    } else {
        delete require.cache[modulePath];
    }

    return newModule;
};

