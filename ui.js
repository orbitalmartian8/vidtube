// UI.js

// Function to create the video player UI
function createVideoPlayerUI(video) {
  const videoContainer = document.getElementById("videoContainer");
  videoContainer.innerHTML = "";

  // Create video player element
  const videoPlayer = document.createElement("video");
  videoPlayer.className = "video-player";
  videoPlayer.src = video.video_file;
  videoPlayer.controls = true;
  videoContainer.appendChild(videoPlayer);

  // Create video title element
  const videoTitle = document.createElement("h2");
  videoTitle.className = "video-title";
  videoTitle.textContent = video.title;
  videoContainer.appendChild(videoTitle);

  // Create video metadata element
  const videoMetadata = document.createElement("div");
  videoMetadata.className = "video-metadata";
  videoContainer.appendChild(videoMetadata);

  // Create video uploader element
  const videoUploader = document.createElement("p");
  videoUploader.className = "video-uploader";
  videoUploader.textContent = "Uploaded by: " + video.uploader;
  videoMetadata.appendChild(videoUploader);

  // Create video upload date element
  const videoUploadDate = document.createElement("p");
  videoUploadDate.className = "video-upload-date";
  videoUploadDate.textContent = "Uploaded on: " + formatDateTime(video.upload_date);
  videoMetadata.appendChild(videoUploadDate);

  // Create video description element
  const videoDescription = document.createElement("p");
  videoDescription.className = "video-description";
  videoDescription.textContent = video.description;
  videoContainer.appendChild(videoDescription);
}

// Function to format date and time
function formatDateTime(dateTime) {
  const options = { year: "numeric", month: "long", day: "numeric", hour: "numeric", minute: "numeric", second: "numeric" };
  return new Date(dateTime).toLocaleString(undefined, options);
}
