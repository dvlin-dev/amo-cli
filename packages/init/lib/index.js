'use strict';

const { log, inquirer } = require('@amo-cli/utils');
const getProjectTemplate = require('./getProjectTemplate');

async function init(options) {
  try {
    log.verbose('init', options);
    const { templateList } = await prepare();
    console.log(templateList);
    const templateName = await inquirer({
      choices: createTemplateChoice(templateList),
      message: '请选择项目模板',
    });
    log.verbose('template', templateName);
  } catch (e) {
    log.error('Error:', e.message);
  }
}

async function prepare() {
  const data = await getProjectTemplate();
  if (data.message !== 'Success' || data.data.length === 0) {
    throw new Error('项目模板列表获取失败');
  }
  return {
    templateList: data.data,
  };
}

function createTemplateChoice(list) {
  return list.map(item => ({
    value: item.npmName,
    name: item.name,
  }));
}

module.exports = init;
