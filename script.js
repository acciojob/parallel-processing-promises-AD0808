const output = document.getElementById("output");
const loading = document.createElement("div");
const errorDiv = document.createElement("div");
loading.id = "loading";
errorDiv.id = "error";
loading.innerText = "Loading...";
errorDiv.style.color = "red";
document.body.appendChild(loading);
document.body.appendChild(errorDiv);
loading.style.display = "none";
errorDiv.style.display = "none";

const images = [
  { url: "https://picsum.photos/id/237/200/300" },
  { url: "https://picsum.photos/id/238/200/300" },
  { url: "https://picsum.photos/id/239/200/300" },
];

function downloadImage(imageUrl) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = imageUrl;
    img.onload = () => resolve(img);
    img.onerror = () => reject(`Failed to load image: ${imageUrl}`);
  });
}

function downloadImages() {
  loading.style.display = "block";
  errorDiv.style.display = "none";
  output.innerHTML = "";

  const imagePromises = images.map((img) => downloadImage(img.url));

  Promise.all(imagePromises)
    .then((downloadedImages) => {
      loading.style.display = "none";
      downloadedImages.forEach((img) => output.appendChild(img));
    })
    .catch((error) => {
      loading.style.display = "none";
      errorDiv.innerText = error;
      errorDiv.style.display = "block";
    });
}

downloadImages();
