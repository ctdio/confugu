# confugu

Simple config loading with support for injecting environment variables.

### Installation

```
npm i confugu
```

### Usage

First, set up a `yaml` file to hold your config values.

```yaml
logLevel: debug

port: ${ HTTP_PORT } # use 'HTTP_PORT' environment variable
```

Next, just pass the path to your config file to the `load` function.

```js
const confugu = require('confugu')

;(async () => {
  const config = await confugu.load('path/to/your/config')

  console.log(config.logLevel) // prints 'debug'
  console.log(config.port) // prints whatever is the value of process.env.HTTP_PORT
})()
```

### Running tests

```bash
npm test
```
