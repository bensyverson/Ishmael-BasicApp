# Ishmael BasicApp Example
[Ishmael](https://github.com/bensyverson/Ishmael) is an isomorphic web app framework, which means the same app code can be run on the server and the browser.

To install the dependencies:
 
     $ npm install
     
To run the demo:

     $ node app.js

Then visit: [http://localhost:1851/app/](http://localhost:1851/app/)

## Explanation
This example "freezes" and serves a very simple app via Express/node.js. The browser will get the static HTML version along with a JavaScript shim to "thaw" the entire app and revive it in place. The browser doesn't even need to re-render the page.

## .html Templates
Ishmael's HTML templates are actual HTML files. This is handy, because you can always view a template by opening it in your browser.

For example, try opening [list.html](templates/list.html) in your browser. You'll see two items: a template ("Put headline here / Put lede here") and an example, using real text ("Yahoo to Enter Fantasy Sports Market").

With this setup, it's possible to iterate your design throughout production. Your templates remain normal HTML, which makes them very easy to view and tweak.

## Annotated Source
Be sure to check out the [nicely annotated source code](docs/index.html) for BasicApp!

## Ishmael
For more on Ishmael, visit [https://github.com/bensyverson/Ishmael](https://github.com/bensyverson/Ishmael)

## License
This software uses the MIT license. For more information, see the [LICENSE](LICENSE)