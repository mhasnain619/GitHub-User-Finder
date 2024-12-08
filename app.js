let userInput = document.getElementById('userInput');

const searchBtn = () => {
    let username = userInput.value;
    if (username !== '') {
        let API_KEY = `https://api.github.com/users/${username}`; // Use the username in the URL

        fetch(API_KEY)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`User not found (status: ${response.status})`);
                }
                return response.json();
            })
            .then(data => console.log(data))
            .catch(error => console.error(error.message));
    } else {
        alert('Please enter a username');
    }
};
