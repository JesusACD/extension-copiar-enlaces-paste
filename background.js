chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.action === "mostrarHref") {
    chrome.tabs.executeScript({ file: "content.js" }, function () {
      sendResponse({ action: "mostrarHref" });
    });
    return true; // Permite mantener la conexión para la respuesta asincrónica
  }
});
