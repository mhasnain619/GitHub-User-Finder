let userInput = document.getElementById('userInput');
let userDataShow = document.getElementById('userDataShow');

const fetchUserData = async (username) => {
    userDataShow.innerHTML = `<div class="loader"></div>`;
    try {
        const API_KEY = `https://api.github.com/users/${username}`;
        const fetchData = await fetch(API_KEY);

        if (!fetchData.ok) {
            if (fetchData.status === 404) {
                Swal.fire("User Not Found...!!");
            } else {
                Swal.fire("An error occurred. Please try again later.");
            }
            userDataShow.innerHTML = ''; // Clear spinner
            return;
        }

        const data = await fetchData.json();
        return showData(data);
    } catch (error) {
        Swal.fire("An unexpected error occurred.");
        userDataShow.innerHTML = ''; // Clear spinner
    }
};

window.onload = () => {
    const defaultUsername = "mhasnain619";
    fetchUserData(defaultUsername);
};
// Event listener for search button
const searchBtn = async () => {
    let username = userInput.value;
    if (!username) {
        Swal.fire("Please Enter a valid username");
    } else {
        await fetchUserData(username);
        userInput.value = '';
    }
};

// Function to display user data
const showData = (data) => {
    const formatDate = (isoString) => {
        const date = new Date(isoString);
        const options = { day: 'numeric', month: 'short', year: 'numeric' };
        return date.toLocaleDateString('en-US', options);
    };

    userDataShow.innerHTML = `
           <div class="profile-card">
            <div class="profile-header">
                <div id="userImage">
                    <img src="${data.avatar_url}" alt="Profile Picture">
                </div>
                <div class="username">
                    <div>
                        <h2>${data.name}</h2>
                        <p>${data.login}</p>
                    </div>
                    <small>${formatDate(data.created_at)}</small>
                </div>
            </div>
            <p class="bio">${data.bio ? data.bio : "No bio available"}</p>
            <div class="stats">
                <div>
                    <h3>Repos</h3>
                    <p>${data.public_repos}</p>
                </div>
                <div>
                    <h3>Followers</h3>
                    <p>${data.followers}</p>
                </div>
                <div>
                    <h3>Following</h3>
                    <p>${data.following}</p>
                </div>
            </div>
            <div class="details">
                <div class="location">
                    <p><span><i class="fa-solid fa-location-dot"></i></span>${data.location ? data.location : 'Location Not Available'}</p>
                    <p><span><i class="fa-solid fa-link"></i></span> <a href="${data.blog ? data.blog : '#'}" target="_blank">${data.blog ? data.blog : 'Blog Not Available'}</a></p>
                </div>
                <div class="location">
                    <p><span><i class="fa-brands fa-twitter"></i></span>${data.twitter_username ? data.twitter_username : 'Twitter Not Available'}</p>
                    <p><span>🏢</span> @github</p>
                </div>
            </div>
        </div>
    `;
};


