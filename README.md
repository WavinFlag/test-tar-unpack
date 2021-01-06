# Test tar unpack

```shell
# Install dependencies
npm install

# Then run the test
npm test

# You can select a different node version
/path/to/your/node ./bin/test.js
```

Note that the `ls` result is printed **twice** when using node v14/15, and the first `ls` prints an incomplete directory. It's printed only once and correctly on node <= 12.

Tested with node v12.20.1, v14.15.4 and v15.5.1 (install by homebrew), on macOS Mojave 10.14.16.
