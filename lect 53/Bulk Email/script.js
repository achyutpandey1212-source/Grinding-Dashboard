
// ---

// ## Scenario 2 — Bulk Email Sending Simulation with Parallel Promises and Error Handling

// Simulate sending bulk emails to 5 users. Treat each email-sending operation as a `Promise` (simulate delays with `setTimeout`).

// ### Requirements

// - Send all emails in parallel using `Promise.all`.
// - If any email fails (e.g., due to a simulated random failure), catch the error and clearly indicate which specific email failed.
// - Use a `finally` block to display a message indicating that the "Email process is complete." (regardless of success/failure).

// ### Suggested tasks

// - Create an array of 5 mock email tasks that resolve or reject based on a random condition.
// - Call `Promise.all` and handle success and failure cases. Show a breakdown of which emails succeeded and which failed.
// - Ensure the `finally` block runs to update the UI or console indicating completion.

// ---


const user = ["ac@gmail.com", "ab@gmail.com", "bgh@gamil.com", "gmai@gmail.com", "user@gmail.com"];

function sendEmail(email){
    const time = Math.floor(Math.random()*5)

    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const probability = Math.floor(Math.random() * 10)
            console.log(probability)
            if(probability <= 5) resolve("Email sent successfully");
            else reject("Email not sent...");
        }, time * 1000);
    })
}

function sendEmails(userList){
    let responses = userList.map(function(email){
        return sendEmail(email)
            .then(function(data){
                console.log(data);
            })
            .catch(function(err){
                console.log(err);
            })
    })
}


sendEmails(user);