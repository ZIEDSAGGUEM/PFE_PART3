import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";

function Story() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [videoPath, setVideoPath] = useState(null);
  const [uploadedVideos, setUploadedVideos] = useState([]);
  const [likedVideos, setLikedVideos] = useState([]);
  const [click, setClick] = useState(false);
  const user = useSelector((state) => state.user);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await axios.get("http://localhost:8080/videos");
        setUploadedVideos(response.data.videos);
      } catch (error) {
        console.error("Error fetching videos:", error);
      }
    };

    fetchVideos();
  }, [uploadedVideos]);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      alert("Please select a video file");
      return;
    }
    const name = user.name;
    const formData = new FormData();
    formData.append("video", selectedFile);
    formData.append("name", name);
    try {
      await axios.post("http://localhost:8080/upload", formData);
    } catch (error) {
      console.error("Error uploading video:", error);
    }
  };

  const handleLike = async (videoId) => {
    const userId = user._id;

    if (likedVideos.includes(videoId)) {
      alert("You have already liked this video");
      return;
    }

    try {
      await axios.post(`http://localhost:8080/video/${videoId}`, { userId });

      setLikedVideos((prevLikedVideos) => [...prevLikedVideos, videoId]);
    } catch (error) {
      console.error("Error liking video:", error);
    }
  };

  return (
    <div className=" mb-14">
      <input
        type="file"
        accept="video/*"
        className=" bg-danger"
        onChange={handleFileChange}
      />
      <button
        className=" mx-5 rounded-5 p-3 bg-danger text-white fs-5 "
        onClick={handleUpload}
      >
        Ajouter Votre Réel
      </button>

      <h1 className=" text-center ">Stories de produits</h1>
      <div className=" d-flex flex-wrap justify-content-center ">
        {uploadedVideos.map((video, index) => (
          <div
            className="  mx-1 text-center fs-5  position-relative"
            key={index}
          >
            <video width="550" height="500" className=" rounded-9" controls>
              <source
                src={`http://localhost:8080/${video.videoUrl}`}
                type="video/mp4"
              />
              Your browser does not support the video tag.
            </video>
            <div
              className="fs-2 position-absolute top-50 text-danger fw-bolder"
              style={{ right: "10px" }}
            >
              <i
                onClick={() => handleLike(video._id)}
                className="fa-solid fa fa-heart  "
                style={{ color: "red", cursor: "pointer" }}
              ></i>
              <p>{video.likes}</p>
            </div>
            <h2>{video.name}</h2>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Story;
