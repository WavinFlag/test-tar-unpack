#!/usr/bin/env node

const path = require('path')

const fn = require('../lib')


const scriptDir = __dirname
const file = path.resolve(scriptDir, '../data/react-scripts-4.0.1.tgz')
const dest = path.resolve(scriptDir, '../data/unpacked')

fn(file, dest)
