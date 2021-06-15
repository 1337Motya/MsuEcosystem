import axiosInstance from "./axiosInstance";

const imageApi = {
  async addFacultyImage(file) {
    var formData = new FormData();
    formData.append("files", file);
    return await axiosInstance
      .post(`Files/UploadFacultyImage`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => res.data[0]);
  },
};

export default imageApi;
