chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.action === "mostrarHref") {
    var texto = "Uptobox.com";
    var elementos = document.getElementsByTagName("*");
    var hrefEtiquetas = [];

    for (var i = 0; i < elementos.length; i++) {
      if (
        elementos[i].innerText === texto &&
        elementos[i].hasAttribute("href")
      ) {
        hrefEtiquetas.push(elementos[i].getAttribute("href"));
      }
    }

    sendResponse({ hrefs: hrefEtiquetas });
  }
});
