const moreRepos = document.getElementById("getMoreRepos");
let currentPage = 1;
const reposPerPage = 10;

function getRepositories(page) {
  const username = "freeCodeCamp";
  const loader = document.getElementById("loader");
  loader.classList.remove("d-none");

  const apiUrl = `https://api.github.com/users/${username}/repos`;

  fetch(`${apiUrl}?per_page=${reposPerPage}&page=${page}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      loader.classList.add("d-none");
      const reposContainer = document.getElementById("repos-container");
     
      reposContainer.innerHTML = "";

      // Display each repository
      data.forEach((repo) => {
        const repoCard = ` <div class="col-sm-12 col-lg-5 card m-2">
                <div class="d-flex justify-content-between m-2">
                    <p class="fw-bold text-info fs-5" id="repoTitle">${
                      repo.name
                    }</p>
                    <p class="border rounded-pill px-1">Public</p>
                </div>
                <p class="ms-2 mb-1" id="repoDescription">${
                  repo.description || "No Description Found"
                }</p>
     <p class="text-danger ms-2 mb-1">${repo.language || "Not Specified"}</p>
     </div>
            
              `;

        reposContainer.innerHTML += repoCard;
      });

    })
    .catch((error) => {
      loader.classList.add("d-none");
    });
}

getRepositories(currentPage);



const getMoreRepos = () => {
  currentPage++;

  getRepositories(currentPage);
};

const getPrevious = () => {
  currentPage--;

  getRepositories(currentPage);
};


