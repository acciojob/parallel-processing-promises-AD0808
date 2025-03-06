

document.addEventListener("DOMContentLoaded", function () {
    const output = document.getElementById("output");

    // Create required divs
    const loadingDiv = document.createElement("div");
    loadingDiv.id = "loading";
    loadingDiv.innerText = "Loading...";
    loadingDiv.style.display = "none"; // Initially hidden
    output.appendChild(loadingDiv);

    const errorDiv = document.createElement("div");
    errorDiv.id = "error";
    errorDiv.style.color = "red";
    output.appendChild(errorDiv);

    const images = [
        { url: "https://picsum.photos/id/237/200/300" },
        { url: "https://picsum.photos/id/238/200/300" },
        { url: "https://picsum.photos/id/239/200/300" }
    ];

    // Function to download a single image
    function downloadImage(url) {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.src = url;
            img.onload = () => resolve(img); // Resolve when the image loads
            img.onerror = () => reject(`Failed to load image: ${url}`); // Reject if the image fails to load
        });
    }

    // Function to download all images in parallel
    async function downloadImages() {
        errorDiv.innerText = ""; // Clear previous errors
        output.innerHTML = ""; // Clear previous images
        output.appendChild(loadingDiv);
        loadingDiv.style.display = "block"; // Show loading spinner

        try {
            const imagePromises = images.map(image => downloadImage(image.url));
            const loadedImages = await Promise.all(imagePromises); // Download all images in parallel

            loadingDiv.style.display = "none"; // Hide loading spinner

            // Append images to output div
            loadedImages.forEach(img => output.appendChild(img));
        } catch (error) {
            loadingDiv.style.display = "none"; // Hide loading spinner
            errorDiv.innerText = error; // Display error message
        }
    }

    // Create and append the button
    const btn = document.createElement("button");
    btn.id = "download-images-button";
    btn.innerText = "Download Images";
    btn.addEventListener("click", downloadImages);
    output.appendChild(btn);
});
