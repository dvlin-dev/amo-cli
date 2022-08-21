const { request } = require('@amo-cli/utils');

module.exports = function () {
  return request({
    url: '/gettemplate',
  });
};
