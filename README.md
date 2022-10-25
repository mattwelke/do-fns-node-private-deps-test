# do-fns-node-private-deps-test

Testing deploying Node.js functions to DigitalOcean Functions that use private dependencies.

Rules:

* Main JS file must be called `index.js`.
* `package-lock.json` will be ignored because `doctl sls deploy` will run `npm install --production` under the hood (not `npm ci`).
* Main JS file must use `module.exports.main = <main_fn>;` (not just have a `main` function at top level)

## Deploying

Run `./deploy.sh`:

```
$ ./deploy.sh 
Deploying '<path>'
  to namespace '<namespace>'
  on host '<host>'
Started running npm install --production in <path>
Finished running npm install --production in <path>

Deployed functions ('doctl sbx fn get <funcName> --url' for URL):
  - priv-dep
```

Get URL with `doctl sls fn get priv-dep --url`:

```
export FN_URL=$(doctl sls fn get priv-dep --url)
```

Invoke with `curl`:

```
$ curl $FN_URL
Hello stranger from priv-dep! The answer to life, the universe, and everything is 42
```

## TO DO

* Add second function that uses the private dependency in `common` to demonstrate that it can be re-used.
* Host contents of `common` in a separate GitHub repo and use that as a submodule here, with a third function using it as a dependency, to test whether submodule style works.
* Host contents of `common` in a private NPM package on npmjs.com, with a fourth function that uses it as a dependency. Add NPM token usage as needed, to test whether `sls deploy` can download private NPM dependencies from private NPM registries.
