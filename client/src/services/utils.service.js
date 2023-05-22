const images = require.context("./../assets/", true, /((\.png)|(\.svg)|(\.jpg))$/);

// this is used cause some pictures now are local, no need to import them in components
export const getImageUrl = (url) => {
  return url.startsWith("@/") ? images(url.replace("@/assets", ".")) : url;
};
