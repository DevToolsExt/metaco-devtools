(() => {
  console.log("importing bootstrapCSS...");

  //   const script = document.createElement("script");

  //   script.src =
  //     "https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/js/bootstrap.bundle.min.js";
  //   script.integrity =
  //     "sha384-OERcA2EqjJCMA+/3y+gxIOqMEjwtxJY7qPCqsdltbNJuaOe923+mo//f6V8Qbsw3";
  //   script.crossOrigin = "anonymous";

  const link = document.createElement("link");

  link.href =
    "https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/css/bootstrap.min.css";
  link.rel = "stylesheet";
  link.integrity =
    "sha384-Zenh87qX5JnK2Jl0vWa8Ck2rdkQ2Bzep5IDxbcnCeuOxjzrPF/et3URy9Bv1WTRi";
  link.crossOrigin = "anonymous";

  document.head.appendChild(link);
  //   document.head.appendChild(script);
})();
