import axios from "axios";
import { useState } from "react";
import { ID, UPLOAD_PRESET, URL } from "../config";
const Blog = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState<any>(null);
  const [isUploading, setIsUploading] = useState(false);
  const handleImage = async (e: any) => {
    const file = e.target.files[0];
    if (file) {
      setIsUploading(true);
      const data = new FormData();
      data.append("file", file);
      data.append("upload_preset", UPLOAD_PRESET);
      try {
        const res = await fetch(
          `https://api.cloudinary.com/v1_1/${ID}/image/upload`,
          {
            method: "POST",
            body: data,
          }
        );
        if (res.ok) {
          const img = await res.json();
          setImage(img);
        } else {
          console.error("Failed to upload image:", res.statusText);
        }
      } catch (error) {
        console.error("Error uploading image:", error);
      } finally {
        setIsUploading(false);
      }
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (image) {
      const response = await axios.post(`${URL}/blog`, {
        title: title,
        content: description,
        image: image,
        authorId: "590ad02a-940d-4099-97b1-f7e300c9cf02",
      });
      console.log(response);
      setTitle("");
      setDescription("");
      setImage(null);
    } else {
      console.error("Image not uploaded");
    }
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-4">Create a New Blog Post</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="title"
            className="block text-gray-700 font-semibold mb-2"
          >
            Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border border-gray-300 p-2 w-full"
            placeholder="Enter title..."
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="description"
            className="block text-gray-700 font-semibold mb-2"
          >
            Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="border border-gray-300 p-2 w-full h-32"
            placeholder="Enter description..."
            required
          ></textarea>
        </div>
        <div className="mb-4">
          <label
            htmlFor="image"
            className="block text-gray-700 font-semibold mb-2"
          >
            Image
          </label>
          <input
            type="file"
            id="image"
            onChange={handleImage}
            className="border border-gray-300 p-2 w-full"
            accept="image/*"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          disabled={isUploading}
        >
          {isUploading ? "Uploading.." : "Create a Blog Post"}
        </button>
      </form>
    </div>
  );
};

export default Blog;
