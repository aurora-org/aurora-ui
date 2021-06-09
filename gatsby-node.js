const path = require('path')

exports.onCreateWebpackConfig = (args) => {
  args.actions.setWebpackConfig({
    resolve: {
      modules: [path.resolve(__dirname, '../src'), 'node_modules'],
      alias: {
        'aurora-ui/lib': path.resolve(__dirname, '../components/'),
        'aurora-ui/esm': path.resolve(__dirname, '../components/'),
        'aurora-ui': path.resolve(__dirname, '../components/'),
      },
    },
  })
}
