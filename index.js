const input = document.getElementById("binary");

//check binary num
function isBinaryNum(num) {
  const pattern = /^[01]+$/;
  return pattern.test(num);
}

document.getElementById("clear").addEventListener("click", (e) => {
  e.preventDefault();
  console.log("clear btn press");
  document.getElementById("binary").value = "";
  document.getElementById("error").innerHTML = "";
  document.getElementById("dec").innerHTML = "";
  document.getElementById("oct").innerHTML = "";
  document.getElementById("hexa").innerHTML = "";
});

document.getElementById("btn").addEventListener("click", (e) => {
  e.preventDefault();
  const binary = input.value;
  const isInputBinary = isBinaryNum(binary);

  if (isInputBinary) {
    const dec = parseInt(binary, 2).toString(10);
    const oct = parseInt(binary, 2).toString(8);
    const hexa = parseInt(binary, 2).toString(16).toLocaleUpperCase();

    document.getElementById("dec").innerHTML = dec;
    document.getElementById("oct").innerHTML = oct;
    document.getElementById("hexa").innerHTML = hexa;
  } else {
    document.getElementById("error").innerHTML = "Only binary values allowed";
    return;
  }

  console.log(`dec: ${dec}`);
  console.log(`oct: ${oct}`);
  console.log(`hexa: ${hexa}`);
  console.log(isInputBinary);
});

// check and register a service worker
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("./cache_entiresite.js")
      .then((reg) => console.log("Service Worker Registered"))
      .catch((err) => console.log(`${err}`));
  });
  console.log("Service Worker supported");
} else {
  console.log("Service worker is not supported");
}
