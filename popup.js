document.addEventListener("DOMContentLoaded", function () {
  var btnMostrarHref = document.getElementById("btnMostrarHref");
  btnMostrarHref.addEventListener("click", function () {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.tabs.sendMessage(
        tabs[0].id,
        { action: "mostrarHref" },
        function (response) {
          if (response && response.hrefs) {
            mostrarHrefsEnTextarea(response.hrefs);
          }
        }
      );
    });
  });
});

function mostrarHrefsEnTextarea(hrefs) {
  var contentElemento = document.createElement("div");
  contentElemento.id = "miExtensionContent";
  contentElemento.style.position = "fixed";
  contentElemento.style.top = "20px";
  contentElemento.style.left = "20px";
  contentElemento.style.backgroundColor = "#FFF";
  contentElemento.style.padding = "10px";
  contentElemento.style.border = "1px solid #000";
  contentElemento.style.zIndex = "9999";
  contentElemento.style.fontFamily = "Arial, sans-serif";

  var textareaElemento = document.createElement("textarea");
  textareaElemento.rows = "10";
  textareaElemento.cols = "50";
  textareaElemento.value = hrefs.join("\n");

  contentElemento.appendChild(textareaElemento);
  document.body.appendChild(contentElemento);
}
