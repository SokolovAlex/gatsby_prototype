// Require `Nuxt` And `Builder` modules
const { Nuxt, Builder, Generator } = require('nuxt')

// Require Nuxt config
const config = require('./nuxt.config.js')

// Create a new Nuxt instance
const nuxt = new Nuxt(config)

// Enable live build & reloading on dev
if (nuxt.options.dev) {
  new Builder(nuxt).build()
  //nuxt.generate();
}