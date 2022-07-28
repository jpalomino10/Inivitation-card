const wait = (delay = 0) =>
  new Promise((resolve) => setTimeout(resolve, delay));

const setVisible = (elementOrSelector, visible) =>
  ((typeof elementOrSelector === "string"
    ? document.querySelector(elementOrSelector)
    : elementOrSelector
  ).style.display = visible ? "block" : "none");

setVisible(".page", false);
setVisible("#loading", true);

async function fetchMoviesJSON() {
  const response = await fetch("/movies");
  const movies = await response.json();
  return movies;
}

async function fetchMoviesJSON() {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const contact_id = urlParams.get("id");

  const response = await fetch(
    `https://us-central1-tcdoc-30c70.cloudfunctions.net/app/api/contacts/${contact_id}`
  );
  const movies = await response.json();
  return movies;
}

(async () => {
  fetchMoviesJSON().then((res) => {
    console.log("res", res);
    localStorage.setItem("contact", JSON.stringify(res));
    document.getElementById("contact_name").innerHTML = res.name;
    setVisible(".page", true);
    setVisible("#loading", false);
  })
})()
