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

Next, just pass the path to your config file to the asynchronous `load` function.

```js
const confugu = require('confugu')

;(async () => {
  const config = await confugu.load('path/to/your/config')

  console.log(config.logLevel) // prints 'debug'
  console.log(config.port) // prints whatever is the value of process.env.HTTP_PORT
})()
```

Or you can load your config synchronously using `loadSync`:

```js
const confugu = require('confugu')

const config = confugu.loadSync('path/to/your/config')

console.log(config.logLevel) // prints 'debug'
console.log(config.port) // prints whatever is the value of process.env.HTTP_PORT
```

### Safely fetching nested properties

Fetching a nested property safely without having to check existence all the way
down the property chain is also supported using the `get` function:

```js
const confugu = require('confugu')

const config = confugu.loadSync('path/to/your/config')

console.log(config.get('logLevel')) // prints the value of the 'logLevel' property
console.log(config.get('db.password')) // prints the value of the 'db.password' property
console.log(config.get('invalid.nested.property')) // Invalid properties are "undefined"
```

### Running tests

```bash
npm test
```
