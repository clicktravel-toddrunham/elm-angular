# elm-angular

Use can use this file to import elm modules (must be built into JS files) directly into cuckoo, so we can test them as a viable option going forward. Import this module into the app/shared/directives folder and then import it into your apps `app.js` file (E.G app/teamadmin/app.js) for usage in your directives etc. You'll also need to import the built elm module via the app HTML (E.G app/Teamadmin.html) like so:

```
<script src="elm/[YOUR_MODULE].js"></script>
<script>
  window.elm = Elm;
</script>
```

You can do this either on a test branch (if your developing something that may actually be used) or in a duplicate of the entire application.

### Disclaimer

It is purely for testing and will need continued work to be completely functional, it will need further discussion before being considered for actual use.

## Usage

```
<elm>
  <div elm module="Main"></div>
  // Other Elm modules here
</elm>
```

## Ports

You can use ports to communicate between elm and angular, which this file is set up to do so. More info on Elm ports here: https://guide.elm-lang.org/interop/javascript.html

You can use the ports in angular like so:

```
$scope.fromJsToElm = 'This gets sent to Elm from angular';

// The other direction
$scope.fromElmToJs = function (msgFromElm) {
  console.log(msgFromElm);
}
```
