const { Octokit } = require("@octokit/core");
// const octokit = require('@octokit/rest')()
const octokit = new Octokit({ auth: `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` });
//{ auth: `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` }

async function getBuildStats() {
    try {
        let { data } = await octokit.request('GET /repos/{owner}/{repo}/actions/jobs/{job_id}', {
            owner: 'mhyder1',
            repo: 'actions-test',
            job_id: 'run-actions',
            // workflow_file_name: 'CI.yml',
        })
        console.log(data)
    } catch(error) {
        console.log(error)
    }
}

getBuildStats()

console.log('Running a github action!')