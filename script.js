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
  const videoPlayer = videojs("videoPlayer", {
    controls: true,
    autoplay: false,
    preload: "auto",
  });

  // Clear any previously loaded sources
  videoPlayer.src([]);

  // Add the video source dynamically
  videoPlayer.src([
    {
      src: video.video_file,
      type: video.mime_type,
    },
  ]);

  const videoTitle = document.getElementById("videoTitle");
  const videoUploader = document.getElementById("videoUploader");
  const videoUploadDate = document.getElementById("videoUploadDate");
  const videoDescription = document.getElementById("videoDescription");

  videoTitle.textContent = video.title;
  videoUploader.textContent = "Uploaded by: " + video.uploader;
  videoUploadDate.textContent = "Uploaded on: " + formatDateTime(video.upload_date);
  videoDescription.textContent = video.description;
}


function formatDateTime(dateTime) {
  const options = { year: "numeric", month: "long", day: "numeric", hour: "numeric", minute: "numeric", second: "numeric" };
  return new Date(dateTime).toLocaleString(undefined, options);
}
