import axiosInstance from "../config/axios";

const postApi = {};

postApi.createPost = (data) => {
  return axiosInstance.post("/posts", data);
};

postApi.fetchPosts = () => {
  return axiosInstance.get("/posts");
};

postApi.adminFetchPosts = () => {
  return axiosInstance.get("/posts/admin");
};

postApi.fetchAllTopicByPostId = (id) => {
  return axiosInstance.get(`/posts/${id}/topic`);
};

postApi.adminFetchAllTopicByPostId = (id) => {
  return axiosInstance.get(`/posts/${id}/topic/admin`);
};

postApi.softDeletePost = (id, data) => {
  return axiosInstance.patch(`/posts/${id}`, data);
};

postApi.softDeleteTopicPost = (id, topicId, data) => {
  return axiosInstance.patch(`/posts/${id}/topic/${topicId}`, data);
};

postApi.createTopicPost = (id, data) => {
  return axiosInstance.post(`/posts/${id}/topic`, data);
};

postApi.deleteImgPost = (postId, id) => {
  return axiosInstance.delete(`/posts/${postId}/img/${id}`);
};

postApi.updatePost = (postId, data) => {
  return axiosInstance.patch(`/posts/${postId}`, data);
};

export default postApi;
