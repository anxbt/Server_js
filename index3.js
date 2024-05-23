#!/usr/bin/env module

import inquirer from "inquirer";
import fs from "fs"
import { ChildProcess } from "child_process";

const dependencies = {
  express: true,
  nodemon: true,
  mongoose: false,
  mongodb: false,
};

async function promptUser() {
  const answers = await inquirer.prompt([
    {
      type: 'confirm',
      name: 'installExpress',
      message: 'Install Express?',
      default: true,
    },
    {
      type: 'confirm',
      name: 'installNodemon',
      message: 'Install Nodemon?',
      default: true,
    },
    {
      type: 'confirm',
      name: 'installMongoose',
      message: 'Install Mongoose (for MongoDB)?',
      default: false,
    },
    {
      type: 'confirm',
      name: 'installMongodb',
      message: 'Install MongoDB driver (if using Mongoose)?',
      default: false,
      when: (answers) => answers.installMongoose,
    },
  ]);

  // Update dependencies based on user choices
  dependencies.express = answers.installExpress;
  dependencies.nodemon = answers.installNodemon;
  dependencies.mongoose = answers.installMongoose;
  dependencies.mongodb = answers.installMongodb && answers.installMongoose;

  return dependencies;
}

async function createPackageJson(deps) {
  const content = JSON.stringify({
    name: 'your-package-name', // Replace with your desired name
    version: '1.0.0',
    description: 'Your package description',
    scripts: {
      start: 'node server.js', // Example script for starting your server
    },
    dependencies: deps,
  }, null, 2);

  try {
    await fs.writeFile('package.json', content);
    console.log('package.json created successfully!');
  } catch (err) {
    console.error('Error creating package.json:', err);
  }
}



async function createServerFile() {
  const serverContent = `
const express = require('express');

const app = express();

// Your custom app logic here (routes, middleware, etc.)

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});
`;

  try {
    await fs.promises.writeFile('server.js', serverContent);
    console.log('Server file created successfully!');
  } catch (err) {
    console.error('Error creating server file:', err);
  }
}

async function main() {
  const deps = await promptUser();
  console.log('Selected dependencies:', deps);

  // Call your package manager to install chosen dependencies (implementation omitted)
  // You can use child_process module to execute package manager commands

  createServerFile();
}

main();
