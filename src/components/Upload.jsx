import React, { useState } from 'react';
import { addNewPhoto } from '../api/firebase';
import { uploadImage } from '../api/uploader';

export default function Upload({ setShowModal, user: { uid } }) {
  const [files, setFiles] = useState([]);
  //   const [photos, setPhotos] = useState({});

  const handleChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setFiles(selectedFiles && selectedFiles.slice(0, 30));
    /*
    const selectedFiles = Array.from(e.target.files);
    setFiles(selectedFiles.slice(0, 30));

    const selectedPhotos = selectedFiles.map((file) =>
      URL.createObjectURL(file)
    );
    */
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const urls = await uploadImage(files); // cloudinary로 파일업로드 (임시)
    await addNewPhoto(uid, urls); // cloudinary로 파일업로드 (임시)
    console.log(urls);

    // 서버로 사용자uid, 이미지 url보내기
    /*setPhotos({ uid, files });
    console.log(photos);*/
  };

  return (
    <section className="fixed top-0 left-0 w-full h-full bg-gray-500 bg-opacity-50 flex justify-center items-center">
      <div className="w-4/6 h-5/6 overflow-y-scroll bg-white rounded-lg p-8">
        <form onSubmit={handleSubmit}>
          <h2 className="text-2xl font-bold mb-4">Upload Image</h2>
          {files && (
            <div className="grid grid-cols-5 gap-4 mb-4">
              {files.map((file) => (
                <img
                  src={URL.createObjectURL(file)}
                  className="w-44 h-44 rounded-md"
                  alt="local file"
                />
              ))}
            </div>
          )}
          <input
            type="file"
            accept="image/*"
            name="file"
            multiple
            required
            onChange={handleChange}
          />
          <div className="flex justify-end mt-4">
            <button
              className="bg-red-400 text-white px-4 py-2 rounded-lg mr-4"
              onClick={() => setShowModal(false)}
            >
              Cancel
            </button>
            <button className="bg-yellow-400 text-white px-4 py-2 rounded-lg">
              Upload
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
