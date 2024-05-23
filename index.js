const { Command } = require('commander');
const fs = require('fs');

const program = new Command();

program
  .version('0.0.1')
  .arguments('<filename>')
  .description('Creates a new JavaScript file.')
  .action((filename) => {
    // Create the file content (optional)
    const content = `// This is a new JavaScript file created by js-file-creator`;

    fs.writeFile(filename, content, (err) => {
      if (err) {
        console.error('Error creating file:', err);
        return;
      }
      console.log(`Created new JavaScript file: ${filename}`);
    });
  });

program.parse(process.argv);
