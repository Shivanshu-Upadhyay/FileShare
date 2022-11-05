import React from "react";
import { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import baseUrl from "./config";
function Upload() {
  const [fromEmail, setFromEmail] = useState("");
  const [toEmail, setToEmail] = useState("");
  const [uuid, setUuid] = useState("");
  const [downloadUrl, setDownloadUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const onFileSelect = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("myFile", e.target.files[0]);
      const { data } = await axios.post(`${baseUrl}/api/fileUpload`, formData);
      setUuid(data.file);
      setDownloadUrl(
        `https://fileshareonline.netlify.app/file/download/${data.file}`
      );
      setLoading(false);
    } catch (error) {
      toast("Somthing Went Wrong", {
        type: "error",
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setLoading(false);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!downloadUrl) {
        return toast("First Upload File", {
          type: "error",
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
      setLoading2(true);
      const formData = {
        url: downloadUrl,
        sendTo: toEmail,
        sendFrom: fromEmail,
        uuid,
      };
      const { data } = await axios.post(
        `${baseUrl}/api/sendFileEmail`,
        formData
      );

      toast(data.message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setLoading2(false);
    } catch (error) {
      toast("Somthing Went Wrong", {
        type: "error",
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };
  return (
    <div className="uploadSection">
      <div className="container">
        <div className="card">
          <label className="card-container" htmlFor="fileUpload">
            <h3 className="card-heading">Upload File</h3>
            <lottie-player
              src="https://assets2.lottiefiles.com/private_files/lf30_y2ryub2r.json"
              background="transparent"
              speed="1"
              style={{ width: "250px", height: "250px" }}
              loop
              autoplay
            />
          </label>
          <input type="file" id="fileUpload" onChange={onFileSelect} />
          <form className="card-form" onSubmit={handleSubmit}>
            <div className="inputNew">
              <input
                type="text"
                className="input-field"
                value={downloadUrl ? downloadUrl : "Upload a file for link"}
                required
                readOnly
              />

              <div
                className="copyBtn"
                onClick={() => navigator.clipboard.writeText(downloadUrl)}
              >
                {loading ? (
                  <span className="loader"></span>
                ) : (
                  <lottie-player
                    src="https://assets1.lottiefiles.com/private_files/lf30_cwe7aish.json"
                    background="transparent"
                    speed="1"
                    style={{ width: "50px", height: "50px" }}
                    loop
                    autoplay
                  />
                )}
              </div>
            </div>
            <div className="emailChoiceText">
              <h3 className="borderForamil">Or Send Mail</h3>{" "}
            </div>
            <div className="input">
              <input
                type="email"
                className="input-field"
                required
                onChange={(e) => setFromEmail(e.target.value)}
              />
              <label className="input-label">Your Email</label>
            </div>

            <div className="input">
              <input
                type="email"
                className="input-field"
                required
                onChange={(e) => setToEmail(e.target.value)}
              />
              <label className="input-label">Receiver Email</label>
            </div>
            <div className="action">
              <button className="action-button" type="submit">
              {loading2? <span className="loader2">Sending</span>:"Send Mail"}
                <lottie-player
                  src="https://assets4.lottiefiles.com/packages/lf20_folnmvzi.json"
                  background="transparent"
                  speed="1"
                  style={{ width: "50px", height: "50px" }}
                  loop
                  autoplay
                />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Upload;
