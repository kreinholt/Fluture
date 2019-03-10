import {node} from '../src/node.mjs';

node(done => done(null, 42)).value(console.log);
