document.addEventListener("DOMContentLoaded", function() {
  const toggleSwitch = document.getElementById("toggle");
  toggleSwitch.addEventListener("change", toggleTheme);

  fetchVideoData();
});

function toggleTheme(event) {
  const body = document.body;
  if (event.target.checked) {
    body.classList.add("dark-mode");
  } else {
    body.classList.remove("dark-mode");
  }
}

function fetchVideoData() {
  fetch("videos.json")
    .then(response => response.json())
    .then(data => {
      displayVideoList(data.videos);
    })
    .catch(error => console.error(error));
}

function displayVideoList(videos) {
  const videoListContainer = document.getElementById("videoList");

  videos.forEach(video => {
    const videoItem = document.createElement("div");
    videoItem.className = "video-item";
    videoItem.innerHTML = `
      <a href="video.html?id=${video.id}">
        <img class="thumbnail" src="${video.thumbnail_file}" alt="Video Thumbnail">
        <div class="video-info">
          <h3 class="video-title">${video.title}</h3>
          <p class="video-uploader">Uploaded by: ${video.uploader}</p>
          <p class="video-upload-date">Uploaded on: ${formatDateTime(video.upload_date)}</p>
        </div>
      </a>
    `;
    videoListContainer.appendChild(videoItem);
  });
}

function formatDateTime(dateTime) {
  const options = { year: "numeric", month: "long", day: "numeric", hour: "numeric", minute: "numeric", second: "numeric" };
  return new Date(dateTime).toLocaleString(undefined, options);
}
