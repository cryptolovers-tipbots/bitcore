# Astracore Build

**A helper to add tasks to gulp.**

## Getting started

Install with:

```sh
npm install astracore-build
```

And use and require in your gulp file:

```javascript
var gulp = require('gulp');
var astracoreTasks = require('astracore-build');

astracoreTasks('submodule');
gulp.task('default', ['lint', 'test', 'browser', 'coverage']);
```

### Notes

- There's no default task to allow for each submodule to set up their own configuration
- If the module is node-only, avoid adding the browser tasks with:

```javascript
var astracoreTasks = require('astracore-build');
astracoreTasks('submodule', { skipBrowsers: true });
```

## Contributing

See [CONTRIBUTING.md](https://github.com/bitpay/astracore/blob/master/Contributing.md) on the main astracore repo for information about how to contribute.

## License

Code released under [the MIT license](https://github.com/bitpay/astracore/blob/master/LICENSE).

Copyright 2013-2019 Astracore, Inc. Astracore is a trademark maintained by Astracore, Inc.
