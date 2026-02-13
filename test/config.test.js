const fs = require('fs');
const path = require('path');

let passed = 0;
let failed = 0;

function test(name, fn) {
  try { fn(); passed++; } catch (e) { console.error(`FAIL: ${name} - ${e.message}`); failed++; }
}
function assert(condition, msg) { if (!condition) throw new Error(msg || 'Assertion failed'); }

const pkg = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'package.json'), 'utf8'));
const nextConfig = require(path.join(__dirname, '..', 'next.config.js'));

test('next is installed as 13.x', () => {
  assert(pkg.dependencies.next.startsWith('13'), `Expected 13.x, got ${pkg.dependencies.next}`);
});

test('react is installed', () => {
  assert(pkg.dependencies.react, 'react should be in dependencies');
});

test('reactStrictMode enabled', () => {
  assert(nextConfig.reactStrictMode === true);
});

test('swcMinify enabled', () => {
  assert(nextConfig.swcMinify === true);
});

test('images domains configured', () => {
  assert(Array.isArray(nextConfig.images.domains), 'should have domains array');
  assert(nextConfig.images.domains.length >= 2, 'should have at least 2 domains');
});

test('experimental appDir enabled', () => {
  assert(nextConfig.experimental.appDir === true, 'appDir should be true');
});

test('experimental serverActions enabled', () => {
  assert(nextConfig.experimental.serverActions === true, 'serverActions should be true');
});

test('output is standalone', () => {
  assert(nextConfig.output === 'standalone');
});

test('app layout exists', () => {
  assert(fs.existsSync(path.join(__dirname, '..', 'src', 'app', 'layout.js')));
});

test('app page exists', () => {
  assert(fs.existsSync(path.join(__dirname, '..', 'src', 'app', 'page.js')));
});

test('about page exists', () => {
  assert(fs.existsSync(path.join(__dirname, '..', 'src', 'app', 'about', 'page.js')));
});

test('API route exists', () => {
  assert(fs.existsSync(path.join(__dirname, '..', 'src', 'pages', 'api', 'hello.js')));
});

test('homepage uses Image component', () => {
  const content = fs.readFileSync(path.join(__dirname, '..', 'src', 'app', 'page.js'), 'utf8');
  assert(content.includes("from 'next/image'"), 'should import Image');
  assert(content.includes("from 'next/link'"), 'should import Link');
});

console.log(`\n${passed} passed, ${failed} failed`);
if (failed > 0) process.exit(1);
