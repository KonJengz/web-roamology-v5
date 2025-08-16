import { create } from "zustand";
import { persist } from "zustand/middleware";
import postApi from "../api/post";

const usePostStore = create(
  persist(
    (set) => ({
      posts: [],
      post: null,
      topics: [],
      topic: null,
      postAdmin: [],
      isLoading: false,
      setPost: (post) => set(() => ({ post })),
      setTopic: (topic) => set(() => ({ topic })),
      setPostAdmin: () => set(() => ({ postAdmin: [] })),
      actionAdminFetchPosts: async () => {
        try {
          const response = await postApi.adminFetchPosts();
          const { posts } = response.data;
          set({ postAdmin: posts });
        } catch (error) {
          console.log("Fetch Posts failed:", error);
          throw error;
        }
      },
      actionCreatePost: async (data) => {
        try {
          const response = await postApi.createPost(data);

          const { newPost } = response.data;
          set((state) => ({ posts: [newPost, ...state.posts] }));
        } catch (error) {
          console.log("create failed:", error);
          throw error;
        }
      },
      actionFetchPosts: async () => {
        try {
          const response = await postApi.fetchPosts();
          const { posts } = response.data;
          set({ posts });
        } catch (error) {
          console.log("Fetch Posts failed:", error);
          throw error;
        }
      },
      actionFetchTopicByPostId: async (id) => {
        try {
          const response = await postApi.fetchAllTopicByPostId(id);
          const { topics } = response.data;
          set({ topics });
        } catch (error) {
          console.log("Fetch Post failed:", error);
          set(() => ({ topics: [], post: null }));
          throw error;
        }
      },
      actionDeletePost: async (id) => {
        try {
          await postApi.softDeletePost(id, { isDelete: true });

          set((state) => ({
            posts: state.posts.filter((post) => post.id !== id),
          }));
        } catch (error) {
          console.log("delete failed:", error);
          throw error;
        }
      },
      actionDeleteTopicPost: async (id, topicId) => {
        try {
          await postApi.softDeleteTopicPost(id, topicId, { isDelete: true });

          set((state) => ({
            topics: state.topics.filter((topic) => topic.id !== topicId),
          }));
        } catch (error) {
          console.log("delete failed:", error);
          throw error;
        }
      },
      actionCreateTopic: async (postId, data) => {
        const response = await postApi.createTopicPost(postId, data);

        const { newTopic } = response.data;
        set((state) => ({ topics: [...state.topics, newTopic] }));
      },
      actionUpdatePost: async (id, data) => {
        try {
          const response = await postApi.updatePost(id, data);

          const { editPost } = response.data;

          console.log("editPost------", editPost);
          set((state) => ({
            posts: state.posts.map((p) =>
              p.id === id ? { ...p, ...editPost } : p
            ),
          }));
          set((state) => ({ post: { ...state.post, ...editPost } }));
        } catch (error) {
          console.log("update failed:", error);
          throw error;
        }
      },
    }),
    {
      name: "post-store",
      partialize: (state) => ({
        posts: state.posts,
        post: state.post,
        topics: state.topics,
        topic: state.topic,
        isLoading: state.isLoading,
        // postAdmin: state.postAdmin,
      }),
    }
  )
);

export default usePostStore;
