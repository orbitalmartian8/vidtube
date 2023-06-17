document.addEventListener("DOMContentLoaded", function() {
  const videoId = getVideoIdFromUrl();
  if (videoId) {
    fetchVideoData(videoId);
  }
});

function getVideoIdFromUrl() {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get("id");
}

function fetchVideoData(videoId) {
  fetch("videos.json")
    .then(response => response.json())
    .then(data => {
      const video = data.videos.find(v => v.id === videoId);
      if (video) {
        displayVideo(video);
      } else {
        console.error("Video not found");
      }
    })
    .catch(error => console.error(error));
}

function displayVideo(video) {
  const videoTitle = document.getElementById("videoTitle");
  const videoUploader = document.getElementById("videoUploader");
  const videoUploadDate = document.getElementById("videoUploadDate");
  const videoDescription = document.getElementById("videoDescription");

  videoTitle.textContent = video.title;
  videoUploader.textContent = "Uploaded by: " + video.uploader;
  videoUploadDate.textContent = "Uploaded on: " + video.upload_date;
  videoDescription.textContent = video.description;
}
