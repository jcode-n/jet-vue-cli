#!/usr/bin/env node

const program = require('commander')

const helpOptions = require('./lib/core/help')
const createCommands = require('./lib/core/create')

// 可以更改指令 -v（小写）
// program.version(require('./package.json').version, '-v, --version') 不支持 -V
// program.version(require('./package.json').version) 因为不支持 -V 所以加这一行（共两行）

// 查看版本号
program.version(require('./package.json').version)

// 帮助和可选信息
helpOptions()

// 创建其他指令
createCommands()

program.parse(process.argv)
