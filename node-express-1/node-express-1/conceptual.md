### Conceptual Exercise

Answer the following questions below:

- What are some ways of managing asynchronous code in JavaScript?
setTimeout
async/await

- What is a Promise?
an object containing some value that is either in the process of resolving or failing

- What are the differences between an async function and a regular function?
async functions will pause execution when the reach an await before continuing to resolve in order while regular functions dont care if something takes time to execute and will keep going.

- What is the difference between Node.js and Express.js?
node is a javasript environment that allows you to execute javascript on the serverside. While express is a web app framework and runs on top of node.

- What is the error-first callback pattern?
a way to manage errors and results when working with async code.
the pattern is to set a callback in the async function where youmake the first parameter of it an error object.then the next param passes the result of the operation if there were no errors.

- What is middleware?
it is any function/ component that is executed during an http request to modify the request/response in one way or another.

- What does the `next` function do?
tells express to move to the next middleware in the chain

- What are some issues with the following code? (consider all aspects: performance, structure, naming, etc)

```js
async function getUsers() {
  const elie = await $.getJSON('https://api.github.com/users/elie');
  const joel = await $.getJSON('https://api.github.com/users/joelburton');
  const matt = await $.getJSON('https://api.github.com/users/mmmaaatttttt');

  return [elie, matt, joel];
}
```

it executes three awaits sequentialy which could make it take a while to execute. 
there is also no error handling.
variable names are not very descriptive.
the urls are hardcoded should set a baseurl variable to avoid any duplication and make managing it easier.

