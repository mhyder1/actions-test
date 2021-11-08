require('dotenv').config()
const { Octokit } = require("@octokit/core");
const octokit = new Octokit({
    auth: process.env.GITHUB_TOKEN,
});

async function deleteWorkflows(owner, repo) {
    // Get total amount of workflows
    const { data: { total_count } } = await octokit.request('GET /repos/{owner}/{repo}/actions/runs', {
        owner,
        repo,
    })

    // Get the current page or runs to delete
    let pageToDelete = Math.ceil(total_count / 25)

    // Delete from the oldest workflows until there are only 5 of the most recent pages left
    while (pageToDelete > 15) {
        try {
            const { data: { total_count, workflow_runs } } = await octokit.request('GET /repos/{owner}/{repo}/actions/runs', {
                owner,
                repo,
                per_page: 25,
                page: pageToDelete
            })
            pageToDelete = Math.ceil(total_count / 25)
            workflow_runs.forEach(async ({ id }) => {
                try {
                    await octokit.request('DELETE /repos/{owner}/{repo}/actions/runs/{run_id}', {
                        owner,
                        repo,
                        run_id: id
                    })
                    console.log(`Deleted workflow ${id}`)
                } catch (error) {
                    if (error) {
                        console.log('Waiting for 30 seconds due to rate limit')
                        await new Promise(resolve => setTimeout(resolve, 30_000));
                    }
                }
            })
        } catch (error) {
            console.log('Waiting for 30 seconds due to rate limit')
            await new Promise(resolve => setTimeout(resolve, 30_000));
        }
        // Waiting a second between deleting pages of workflows (25 workflows per page)
        await new Promise(resolve => setTimeout(resolve, 1000));
    }
}
deleteWorkflows('department-of-veterans-affairs', 'lighthouse-backstage')