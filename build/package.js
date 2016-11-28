export var name = "monte";
export var version = "0.0.0-alpha20";
export var author = {"name":"Yellow Tugboat","url":"http://www.yellowtugboat.com"};
export var description = "A set of common charts based on D3 built for extension and modification.";
export var main = "build/monte.js";
export var scripts = {"postpublish":"zip -j build/monte.zip -- LICENSE README.md build/monte.js build/monte.min.js","prepublish":"npm run build","test":"(browserify test/**/*-test.js | tape-run) && npm run lint","lint":"eslint src/**","package-version":"json2module package.json > build/package.js","package-umd":"rollup --config config/rollup.config.umd.js","package-umd-min":"npm run lint && rollup --config config/rollup.config.umd.min.js","watch":"npm run package-version && nodemon -e js -w *.js -w src -x \"npm run package-version && npm run package-umd\"","build":"npm run package-version && npm run package-umd && npm run package-umd-min"};
export var repository = {"type":"git","url":"git+https://github.com/YellowTugboat/monte.git"};
export var keywords = ["D3","chart","charts","Monte","line","scatter","bar","pie","donut","doughnut","icon","iconarray"];
export var license = "GPL-3.0";
export var bugs = {"url":"https://github.com/YellowTugboat/monte/issues"};
export var homepage = "https://github.com/YellowTugboat/monte#readme";
export var devDependencies = {"babel-cli":"6","babel-plugin-lodash":"3.2.9","babel-preset-es2015-rollup":"1","browser-run":"^3.2.0","browserify":"^13.1.0","d3":"4","eslint":"3","eslint-config-yellow-tugboat":"0","http-server":"^0.9.0","json2module":"0.0.3","lodash":"4","lodash-es":"4","nodemon":"^1.9","rollup":"^0.36","rollup-plugin-babel":"2","rollup-plugin-node-resolve":"2","rollup-plugin-uglify":"1","tape":"^4.6.0","tape-run":"^2.1.4"};
export var peerDependencies = {"d3":"^4"};
