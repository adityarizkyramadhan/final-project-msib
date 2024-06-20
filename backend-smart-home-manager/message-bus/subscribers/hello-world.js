const sayHello = (msg) => {
  console.log(`Hello, ${msg.name}`);
};

module.exports = [
  {
    key: 'hello-world',
    handler: sayHello,
  },
];
