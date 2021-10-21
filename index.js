const { Octokit } = require("@octokit/rest");
// const octokit = require('@octokit/rest')()
const octokit = new Octokit({ auth: `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` });
// const octokit = new Octokit()
// "GET /users"

// octokit.authenticate({
//     type: 'token',
//     token: `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`
// })

// octokit.rest.*, octokit.request

async function getBuildStats() {
    try {
        // let {data} = await octokit.request('GET /repos/{owner}/{repo}/actions/jobs/{job_id}')
        // let res = await octokit.actions.getWorkflowRun({
        //     owner: 'mhyder1',
        //     repo: 'actions-test',
        //     job_id: 'build'
        // })
        const res = await octokit.paginate.iterator(octokit.rest.issues.listForRepo, {
            owner: "mhyder1",
            repo: "actions-test",
            per_page: 10,
          });
        console.log(res)
        // for await (const { data: issues } of res) {
        //     for (const issue of issues) {
        //       console.log("Issue #%d: %s", issue.number, issue.title);
        //     }
        //   }


    } catch(error) {
        console.log(error)
    }
    
}

getBuildStats()

console.log('Running a github action!')