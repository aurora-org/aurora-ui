const { mergeWith } = require('docz-utils')
const fs = require('fs-extra')

let custom = {}
const hasGatsbyConfig = fs.existsSync('./gatsby-config.custom.js')

if (hasGatsbyConfig) {
  try {
    custom = require('./gatsby-config.custom')
  } catch (err) {
    console.error(
      `Failed to load your gatsby-config.js file : `,
      JSON.stringify(err),
    )
  }
}

const config = {
  pathPrefix: '/',

  siteMetadata: {
    title: 'aurora-ui',
    description: 'UI Framework for aurora-org.',
  },
  plugins: [
    {
      resolve: 'gatsby-plugin-typescript',
      options: {
        isTSX: true,
        allExtensions: true,
      },
    },
    {
      resolve: 'gatsby-theme-docz',
      options: {
        themeConfig: {},
        src: './',
        gatsbyRoot: null,
        themesDir: 'src',
        mdxExtensions: ['.md', '.mdx'],
        docgenConfig: {},
        menu: [],
        mdPlugins: [],
        hastPlugins: [],
        ignore: [],
        typescript: true,
        ts: false,
        propsParser: true,
        'props-parser': true,
        debug: false,
        native: false,
        openBrowser: null,
        o: null,
        open: null,
        'open-browser': null,
        root: '/home/wanghuiyang/aurora/aurora-ui/.docz',
        base: '/',
        source: './',
        'gatsby-root': null,
        files: './Components/**/*.{md,markdown,mdx}',
        public: '/public',
        dest: 'doc-site',
        d: '.docz/dist',
        editBranch: 'master',
        eb: 'master',
        'edit-branch': 'master',
        config: '',
        title: 'aurora-ui',
        description: 'UI Framework for aurora-org.',
        host: 'localhost',
        port: 3001,
        p: 3000,
        separator: '-',
        paths: {
          root: '/home/wanghuiyang/aurora/aurora-ui',
          templates:
            '/home/wanghuiyang/aurora/aurora-ui/node_modules/docz-core/dist/templates',
          docz: '/home/wanghuiyang/aurora/aurora-ui/.docz',
          cache: '/home/wanghuiyang/aurora/aurora-ui/.docz/.cache',
          app: '/home/wanghuiyang/aurora/aurora-ui/.docz/app',
          appPackageJson: '/home/wanghuiyang/aurora/aurora-ui/package.json',
          appTsConfig: '/home/wanghuiyang/aurora/aurora-ui/tsconfig.json',
          gatsbyConfig: '/home/wanghuiyang/aurora/aurora-ui/gatsby-config.js',
          gatsbyBrowser: '/home/wanghuiyang/aurora/aurora-ui/gatsby-browser.js',
          gatsbyNode: '/home/wanghuiyang/aurora/aurora-ui/gatsby-node.js',
          gatsbySSR: '/home/wanghuiyang/aurora/aurora-ui/gatsby-ssr.js',
          importsJs: '/home/wanghuiyang/aurora/aurora-ui/.docz/app/imports.js',
          rootJs: '/home/wanghuiyang/aurora/aurora-ui/.docz/app/root.jsx',
          indexJs: '/home/wanghuiyang/aurora/aurora-ui/.docz/app/index.jsx',
          indexHtml: '/home/wanghuiyang/aurora/aurora-ui/.docz/app/index.html',
          db: '/home/wanghuiyang/aurora/aurora-ui/.docz/app/db.json',
        },
      },
    },
  ],
}

const merge = mergeWith((objValue, srcValue) => {
  if (Array.isArray(objValue)) {
    return objValue.concat(srcValue)
  }
})

module.exports = merge(config, custom)
