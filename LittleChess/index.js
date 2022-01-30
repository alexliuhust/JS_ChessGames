let powersForPlayer1 = document.getElementById("powersForPlayer1");

let powersForPlayer2 = document.getElementById("powersForPlayer2");

powersForPlayer1.addEventListener("change", (e) => {
  let power1 = powersForPlayer1.value;
  window.localStorage.setItem("power1", power1);
});

powersForPlayer2.addEventListener("change", (e) => {
  let power2 = powersForPlayer2.value;
  window.localStorage.setItem("power2", power2);
});
