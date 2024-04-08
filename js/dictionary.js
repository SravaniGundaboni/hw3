document.addEventListener("DOMContentLoaded", function () {
    const searchInput = document.getElementById("searchInput");
    const searchButton = document.getElementById("searchButton");
    const meaningsContainer = document.getElementById("meaningsContainer");

    searchButton.addEventListener("click", function () {
        search();
    });

    searchInput.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            search();
        }
    });

    function search() {
        const query = searchInput.value.trim();
        if (query !== "") {
            fetchMeanings(query);
        }
    }

    function fetchMeanings(query) {
        const apiUrl = `https://api.dictionaryapi.dev/api/v2/entries/en/${query}`;

        fetch(apiUrl)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok.');
                }
                return response.json();
            })
            .then(data => {
                displayMeanings(data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                meaningsContainer.innerHTML = "<p>Error fetching meanings. Please try again later.</p>";
            });
    }

    function displayMeanings(data) {
        meaningsContainer.innerHTML = "";
        if (Array.isArray(data) && data.length > 0) {
            const meanings = data[0].meanings;
            const ul = document.createElement("ul");
            meanings.forEach(meaning => {
                const li = document.createElement("li");
                li.textContent = meaning.definitions[0].definition; // Assuming "definitions" property exists in the API response
                ul.appendChild(li);
            });
            meaningsContainer.appendChild(ul);
        } else {
            meaningsContainer.innerHTML = "<p>No meanings found.</p>";
        }
    }
});
