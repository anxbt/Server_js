import inquirer from "inquirer";
import fs from "fs"
// Optionally, include ejs if needed

async function promptUser() {
  const answers = await inquirer.prompt([
    {
      type: 'input',
      name: 'projectName',
      message: 'Enter your project name:',
    },
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
      when: (answers) => answers.installMongoose,
    },
  ]);

  return answers;
}

async function createProject(answers) {
  const projectDir = `${process.cwd()}/${answers.projectName}`;

  // Check if directory exists (add error handling)
  await fs.mkdir(projectDir);

  // Copy or generate files based on user choices
  // You can use ejs for templating if needed

  const packageJson = {
    name: answers.projectName,
    version: '1.0.0',
    description: 'Your Express project',
    scripts: {
      start: 'node server.js', // Example script
    },
    dependencies: {},
  };

  if (answers.installExpress) {
    packageJson.dependencies.express = '^4.18.2'; // Example version
  }
  // Add dependencies for Nodemon, Mongoose, and MongoDB driver as needed

  const packageJsonContent = JSON.stringify(packageJson, null, 2);
  await fs.writeFile(`${projectDir}/package.json`, packageJsonContent);

  // Create a basic server file (server.js) if needed
  // ...

  console.log(`Project '${answers.projectName}' created successfully!`);
}

async function main() {
  const answers = await promptUser();
  await createProject(answers);
}

main();
