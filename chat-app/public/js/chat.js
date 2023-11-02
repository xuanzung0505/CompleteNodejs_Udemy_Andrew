const socket = io();
const $form = document.querySelector("#send");
const $formInput = $form.querySelector("input");
const $formButton = $form.querySelector("button");
const $locationButton = document.querySelector("#location");

socket.on("welcome", () => {
  console.log("Welcome!");
});

socket.on("newClient", () => {
  console.log("A new client has entered the chat!");
});

socket.on("message", (message) => {
  console.log(message);
});

$form.addEventListener("submit", (e) => {
  e.preventDefault();
  const message = e.target.elements.message.value;

  $formButton.setAttribute("disabled", "disabled");

  socket.emit("sendMessage", message, (error) => {
    $formButton.removeAttribute("disabled");
    $formInput.value = "";
    $formInput.focus();

    if (error) {
      return console.log(error);
    }

    console.log("Message delivered!");
  });
});

$locationButton.addEventListener("click", () => {
  if (!navigator.geolocation) {
    return alert("Geolocation is not supported in your browser.");
  }

  navigator.geolocation.getCurrentPosition((position) => {
    $locationButton.setAttribute("disabled", "disabled");

    socket.emit(
      "sendLocation",
      {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      },
      () => {
        $locationButton.removeAttribute("disabled");
        console.log("Location shared!");
      }
    );
  });
});
