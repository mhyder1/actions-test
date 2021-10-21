const { Octokit } = require("@octokit/core");
// const octokit = require('@octokit/rest')()
const octokit = new Octokit();

async function getBuildStats() {
    try {
        let { data: { jobs } } = await octokit.request('GET /repos/{owner}/{repo}/actions/runs/{run_id}/jobs', {
            owner: 'mhyder1',
            repo: 'actions-test',
            run_id: process.env.runId
          })
        // console.log(JSON.stringify(data, null, 2))
        console.log({jobs})
        // let { data } = await octokit.request('GET /repos/{owner}/{repo}/actions/jobs/{job_id}', {
        //     owner: 'mhyder1',
        //     repo: 'actions-test',
        //     job_id: 'run-actions',
        //     // workflow_file_name: 'CI.yml',
        // })
        // console.log(data)
    } catch(error) {
        console.log(error)
    }
}

getBuildStats()

console.log('Running a github action!')