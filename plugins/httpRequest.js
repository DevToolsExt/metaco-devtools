const httpRequest = function (method, url, { headers, body, options } = {}) {
  method = method.toUpperCase();
  let xhr = new XMLHttpRequest();
  xhr.withCredentials = true;
  xhr.open(method, url);

  headers = headers ?? {};

  if (!headers["Content-Type"]) {
    xhr.setRequestHeader("Content-Type", "application/json");
  }
  xhr.setRequestHeader("Access-Control-Allow-Origin", "*");
  for (const key in headers) {
    if (Object.hasOwnProperty.call(headers, key)) {
      xhr.setRequestHeader(key, headers[key]);
    }
  }

  if (body) {
    if (headers["Content-Type"].includes("form-urlencoded")) {
      const formData = new URLSearchParams(body).toString();

      xhr.send(formData);
    } else {
      xhr.send(typeof body !== "string" ? JSON.stringify(body) : body);
    }

    // xhr.send(body);
  } else {
    xhr.send();
  }

  return new Promise((resolve, reject) => {
    xhr.onload = function () {
      if (xhr.status === 401) {
        reject(xhr.statusText);
        return;
      } else {
        resolve(JSON.parse(xhr.responseText));
      }
    };

    xhr.onerror = function () {
      reject(JSON.parse(xhr.responseText));
    };
  });
};

window.httpRequest = httpRequest;
