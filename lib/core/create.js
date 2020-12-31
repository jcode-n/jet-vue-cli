const program = require('commander')
const { createProjectAction, addComponentAction, addPagesAndRouter, addStoreAction } = require('./actions')

const createCommands = () => {
  program
    .command('create <project> [others...]')
    .description('clone a repository into a folder')
    .action(createProjectAction)

  program
    .command('addcpn <name>')
    .description('add vue component, 例如: jet addcpn Home [-d src/components]')
    .action((name) => {
      addComponentAction(name, program.dest || 'src/components')
    })

  program
    .command('addpage <page>')
    .description('add vue page and router config, 例如: jet addpage Home [-d src/pages]')
    .action((page) => {
      addPagesAndRouter(page, program.dest || 'src/pages')
    })

  program
    .command('addstore <store>')
    .description('add vuex, 例如: jet addstore Home [-d src/store]')
    .action((store) => {
      addStoreAction(store, program.dest || 'src/store/modules')
    })
}

module.exports = createCommands
