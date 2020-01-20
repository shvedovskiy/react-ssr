module.exports = {
  env: {
    client: {
      presets: [
        [
          "@babel/preset-env",
          {
            useBuiltIns: "usage",
            modules: false,
            corejs: 3,
            shippedProposals: true
          }
        ],
        "@babel/preset-react"
      ]
    },
    server: {
      presets: [
        [
          "@babel/preset-env",
          {
            useBuiltIns: "usage",
            modules: false,
            corejs: 3,
            shippedProposals: true,
            targets: {
              node: 12
            }
          }
        ],
        "@babel/preset-react"
      ]
    }
  }
};
