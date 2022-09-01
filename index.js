//Learning Jest.  This is just the main file to use
//for functions.

function sum(a, b) {
    return a + b;
  }
exports.sum = sum;

async function fetchData(url) {
    try {
        if(url === "/pb")
            return Promise.resolve("Peanut Butter");
        else
            return Promise.reject("error");
    } catch(error) {
        return Promise.reject("error");
    }
}
exports.fetchData = fetchData;