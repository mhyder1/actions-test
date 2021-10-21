const { Octokit } = require("@octokit/core");
// const octokit = require('@octokit/rest')()
const octokit = new Octokit();
//$GITHUB_SHA   github commit number
console.log(process.env.obj)
async function getBuildStats() {
    try {
        let { data: { jobs } } = await octokit.request('GET /repos/{owner}/{repo}/actions/runs/{run_id}/jobs', {
            owner: 'mhyder1',
            repo: 'actions-test',
            run_id: process.env.runId
          })
        // console.log(JSON.stringify(data, null, 2))
        // const job_id = jobs[0].id
        // let { data : { steps } } = await octokit.request('GET /repos/{owner}/{repo}/actions/jobs/{job_id}', {
        //     owner: 'mhyder1',
        //     repo: 'actions-test',
        //     job_id,
        // })
        console.log(JSON.stringify(jobs[0].steps, null, 2))
        // console.log(jobs[0].steps)
    } catch(error) {
        console.log(error)
    }
}

getBuildStats()

console.log('Running a github action!')