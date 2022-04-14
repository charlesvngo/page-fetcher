const fs = require('fs');
const request = require('request');
const readline = require('readline');
const { stdin: input, stdout: output } = require('process');
const rl = readline.createInterface({ input, output });

const url = process.argv.slice(2);

// Helper function to write a file to index.html.
const writeToIndex = (body) => {
  fs.writeFile('./index.html', body, err => {
    if (err) {
      console.error(err);
      return;
    }
    //file written successfully
    console.log(`Downloaded and saved ${body.length} bytes to ./index.html`);
  });
};

request(url[0], (error, response, body) => {
  // Check to see if the current file exists. If not, proceed to creating new html.
  fs.access('./index.html', fs.F_OK, (err) => {
    if (err) {
      writeToIndex(body);
      return;
    }
    // Confirms with user if they would like to overwrite the current index file.
    rl.question("File currently exists. Would you like to overwrite? ", (answer) => {
      if (answer === "Y") {
        writeToIndex(body);
      } else {
        console.log("Cancelling operation. Please try again");
        process.exit();
      }
      rl.close();
    });
  });
});

