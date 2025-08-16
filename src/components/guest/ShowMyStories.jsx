import { useEffect } from "react";
import usePostStore from "../../stores/postStore";
import { useNavigate } from "react-router";
import { CalendarRange } from "lucide-react";
import useUserStore from "../../stores/userStore";
import BtnEditDelete from "../admin/BtnEditDelete";
import ModelMain from "../admin/ModelMain";
import UpdateMyStories from "../admin/UpdateMyStories";

function ShowMyStories() {
  const user = useUserStore((state) => state.user);
  const posts = usePostStore((state) => state.posts);
  const actionFetchPosts = usePostStore((state) => state.actionFetchPosts);
  const setPost = usePostStore((state) => state.setPost);
  const actionDeletePost = usePostStore((state) => state.actionDeletePost);
  const postAdmin = usePostStore((state) => state.postAdmin);
  const actionFetchTopicByPostId = usePostStore(
    (state) => state.actionFetchTopicByPostId
  );

  const actionAdminFetchPosts = usePostStore(
    (state) => state.actionAdminFetchPosts
  );

  console.log("user ----", user);
  // console.log("posts", posts);
  // console.log("postAdmin---", postAdmin);
  const navigate = useNavigate();

  useEffect(() => {
    actionFetchPosts();
  }, [actionFetchPosts]);

  useEffect(() => {
    if (user) {
      actionAdminFetchPosts();
    }
  }, [user, actionAdminFetchPosts]);

  const handleClick = async (post) => {
    await actionFetchTopicByPostId(post.id);
    setPost(post);
    navigate(`/stories/${post.countryName}/${post.placeName}/${post.id}`);
  };

  const handleClickDelete = async (e, id) => {
    e.stopPropagation();
    await actionDeletePost(id);
  };

  const handleClickEdit = async (e, post) => {
    e.stopPropagation();
    setPost(post);
    document.getElementById("modal_edit_my_stories").show();
  };

  return (
    <div className="grid py-8 grid-cols-2 gap-x-4 gap-y-6 sm:grid-cols-3 sm:gap-5 md:grid-cols-3 md:gap-x-6 lg:grid-cols-4 lg:gap-12 xl:grid-cols-5 xl:gap-20">
      {posts.map((post) => (
        <div
          key={post.id}
          className="cursor-pointer relative"
          onClick={() => handleClick(post)}
        >
          {postAdmin.some((p) => p.id === post.id) && (
            <BtnEditDelete
              handleClickDelete={(e) => handleClickDelete(e, post.id)}
              handleClickEdit={(e) => handleClickEdit(e, post)}
            />
          )}

          {post?.imgPost[0]?.imgUrl && (
            <div className="h-70 md:h-80 lg:h-90 overflow-hidden">
              <img
                className="w-full h-full object-cover hover:scale-105 duration-300"
                src={post?.imgPost[0]?.imgUrl}
                alt={post.placeName}
              />
            </div>
          )}

          <div className="p-2">
            <h1 className="text-sm text-roamology">
              country: {post?.countryName}
            </h1>
            <h2 className="text-xl text-gray-600 font-bold">
              {post?.placeName}
            </h2>
            <p className="text-xs text-gray-600">{post?.zone}</p>
            {post.date && (
              <small className="text-xs text-gray-400 flex items-center gap-1">
                <CalendarRange width={16} />
                {new Date(post.date).toLocaleDateString()}
              </small>
            )}
          </div>
        </div>
      ))}
      <ModelMain modalName="modal_edit_my_stories">
        <UpdateMyStories />
      </ModelMain>
    </div>
  );
}
export default ShowMyStories;
