const form = document.querySelector(".form");
const formSignUp = document.querySelector(".form-sign-up");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const userData = new FormData(form);

  const response = await fetch(`http://localhost:7000/`, {
    method: "POST",
    body: userData,
  });

  const data = await response.json();

  console.log(data);
});

formSignUp.addEventListener("submit", async (e) => {
  e.preventDefault();

  const userData = new FormData(formSignUp);

  const response = await fetch(`http://localhost:7000/login`, {
    method: "POST",
    body: userData,
  });

  const data = await response.json();

  console.log(data);
});
