const fs = require('fs');
const csv = require('csv-parser');
const sloc = require('node-sloc');
const { execSync } = require('child_process');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;

// Function to clone a repository
function cloneRepository(repositoryURL) {
    
    if (!repositoryURL.startsWith('https://github.com/') || repositoryURL==="https://github.com/openpatch/hyperbook") {
        console.log(`Skipping clone for non-GitHub repository: ${repositoryURL}`);
        return;
    }

    try {
        execSync(`git clone ${repositoryURL}`);
        console.log(`Cloned ${repositoryURL}`);
    } catch (error) {
        console.error(`Error cloning ${repositoryURL}: ${error.message}`);
        throw error;
    }
}

// Function to remove a directory recursively
function removeDirectory(directory) {
    try {
        fs.rmdirSync(directory, { recursive: true });
        console.log(`Removed ${directory}`);
    } catch (error) {
        console.error(`Error removing ${directory}: ${error.message}`);
    }
}

// Function to run node-sloc on a given directory
function runSloc(repositoryURL) {
    return new Promise((resolve, reject) => {
        const repositoryName = repositoryURL.split('/').pop().replace('.git', '');
        const directory = `./${repositoryName}`;
        const options = {
            path: directory,
            ignorePaths: ['node_modules']
        };

        sloc(options)
            .then((res) => {
                const rowData = {
                    git_repository_url_final: repositoryURL,
                    sloc: res.sloc,
                    blankLines: res.blank,
                    filesCounted: res.files,
                    totalLOC: res.sloc + res.blank + res.comments
                };
                resolve(rowData);
                removeDirectory(directory); // Delete cloned repository
            })
            .catch((err) => {
                console.error(`Error analyzing ${directory}: ${err.message}`);
                removeDirectory(directory); // Delete cloned repository
                reject(err);
            });
    });
}

// Read repository URLs from a CSV file
const repositories = [];

fs.createReadStream('./files/split_csv_0.csv')
    .pipe(csv())
    .on('data', (row) => {
        const repositoryURL = row['git_repository_url_final'];
        if (repositoryURL) {
            repositories.push(repositoryURL);
        } else {
            console.warn('Repository URL is empty. Skipping...');
        }
    })
    .on('end', async () => {
        console.log('CSV file successfully processed');

        const slocData = [];

        // Sequentially process each repository
        for (const repositoryURL of repositories) {
            cloneRepository(repositoryURL);
            try {
                const rowData = await runSloc(repositoryURL);
                slocData.push(rowData);
                console.log('Processed repository:', repositoryURL);
            } catch (error) {
                console.error('Error processing repository:', repositoryURL, error);
            }
        }

        console.log('SLOC data:', slocData);

        const csvWriter = createCsvWriter({
            path: 'sloc_results_0.csv',
            header: [
                { id: 'git_repository_url_final', title: 'GitHub Repository URL' },
                { id: 'sloc', title: 'Source Lines of Code (SLOC)' },
                { id: 'blankLines', title: 'Blank lines' },
                { id: 'filesCounted', title: 'Files counted' },
                { id: 'totalLOC', title: 'Total LOC' }
            ]
        });

        csvWriter.writeRecords(slocData)
            .then(() => console.log('CSV file successfully written with SLOC data'))
            .catch((error) => console.error(`Error writing CSV file: ${error.message}`));
    });
