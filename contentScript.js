// Contenido del archivo contentScript.js
function mostrarHrefEtiquetasConInnerText(texto) {
  var elementos = document.getElementsByTagName("*");
  var hrefEtiquetas = [];

  for (var i = 0; i < elementos.length; i++) {
    if (elementos[i].innerText === texto && elementos[i].hasAttribute("href")) {
      hrefEtiquetas.push(elementos[i].getAttribute("href"));
    }
  }

  var contentElemento = document.querySelector(".content");

  // Obtener el elemento del botón "Mostrar enlaces" (si ya existe)
  var buttonElemento = document.querySelector("#mostrar-enlaces-btn");

  // Crear el botón "Mostrar enlaces" si no existe
  if (!buttonElemento) {
    buttonElemento = document.createElement("button");
    buttonElemento.id = "mostrar-enlaces-btn";
    buttonElemento.innerHTML = "Mostrar enlaces";
    buttonElemento.style.marginRight = "10px"; // Aplicar el estilo margin-right: 10px;

    buttonElemento.addEventListener("click", function () {
      var inputElemento = document.querySelector(".mostrar-enlaces-input");
      var valorInput = inputElemento.value.trim();
      mostrarHrefEtiquetasConInnerText(valorInput);
    });

    // Agregar el botón al elemento content
    contentElemento.insertBefore(buttonElemento, contentElemento.firstChild);
  }

  // Obtener el elemento del botón "Copiar Href" (si ya existe)
  var copyButtonElemento = document.querySelector("#copiar-href-btn");

  // Crear el botón "Copiar Href" si no existe
  if (!copyButtonElemento) {
    copyButtonElemento = document.createElement("button");
    copyButtonElemento.id = "copiar-href-btn";
    copyButtonElemento.innerHTML = "Copiar Enlaces";
    copyButtonElemento.style.marginLeft = "10px";

    copyButtonElemento.addEventListener("click", function () {
      var textareaElemento = document.querySelector(
        ".mostrar-enlaces-textarea"
      );
      var hrefsSinEnumeracion = hrefEtiquetas.join("\n");

      // Crear un elemento de texto temporal para copiar el contenido del textarea
      var tempElemento = document.createElement("textarea");
      tempElemento.value = hrefsSinEnumeracion;
      document.body.appendChild(tempElemento);
      tempElemento.select();
      document.execCommand("copy");
      document.body.removeChild(tempElemento);

      alert("Enlaces copiados al portapapeles: \n\n" + hrefsSinEnumeracion);
    });

    // Agregar el botón "Copiar Href" debajo del botón "Mostrar enlaces"
    contentElemento.insertBefore(
      copyButtonElemento,
      buttonElemento.nextSibling
    );
  }

  // Crear el elemento <input> si no existe
  var inputElemento = document.querySelector(".mostrar-enlaces-input");
  if (!inputElemento) {
    inputElemento = document.createElement("input");
    inputElemento.className = "mostrar-enlaces-input";
    inputElemento.type = "text";

    // Agregar el input al elemento content
    contentElemento.insertBefore(inputElemento, buttonElemento.nextSibling);
  }

  // Crear el elemento <textarea> si no existe
  var textareaElemento = document.querySelector(".mostrar-enlaces-textarea");
  if (!textareaElemento) {
    textareaElemento = document.createElement("textarea");
    textareaElemento.className = "mostrar-enlaces-textarea";
    textareaElemento.rows = "10";
    textareaElemento.cols = "50";

    // Agregar el textarea debajo del botón "Copiar Href"
    contentElemento.insertBefore(
      textareaElemento,
      copyButtonElemento.nextSibling
    );
  }

  // Actualizar el valor del textarea con enumeración
  textareaElemento.value = hrefEtiquetas
    .map(function (link, index) {
      return index + 1 + ". " + link;
    })
    .join("\n");
}

mostrarHrefEtiquetasConInnerText("Uptobox.com");
