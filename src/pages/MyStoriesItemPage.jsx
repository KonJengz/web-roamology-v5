import { useEffect } from "react";
import BtnCreate from "../components/admin/BtnCreate";
import CreateTopicMyStories from "../components/admin/CreateTopicMyStories";
import ModelMain from "../components/admin/ModelMain";
import HeadMyStoriesItem from "../components/guest/HeadMyStoriesItem";
import useUserStore from "../stores/userStore";

import usePostStore from "../stores/postStore";
import { Navigate, useParams } from "react-router";
import ShowTopicPost from "../components/guest/ShowTopicPost";

function MyStoriesItemPage() {
  const user = useUserStore((state) => state.user);
  const post = usePostStore((state) => state.post);
  const actionAdminFetchPosts = usePostStore(
    (state) => state.actionAdminFetchPosts
  );
  const postAdmin = usePostStore((state) => state.postAdmin);

  const actionFetchTopicByPostId = usePostStore(
    (state) => state.actionFetchTopicByPostId
  );

  const { postId } = useParams();

  // const navigator = useNavigate();

  useEffect(() => {
    if (user) {
      actionAdminFetchPosts();
    }
  }, [user, actionAdminFetchPosts]);

  useEffect(() => {
    actionFetchTopicByPostId(postId);
  }, [actionFetchTopicByPostId, postId]);

  if (!post) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="p-8">
      <HeadMyStoriesItem />
      <div className="divider"></div>
      <ShowTopicPost id={postId} />

      {postAdmin.some((p) => p.id === post?.id) && (
        <BtnCreate
          text="Create Topic My Stories"
          nameModal="modal_create_topic_my_stories"
        >
          <ModelMain modalName="modal_create_topic_my_stories">
            <CreateTopicMyStories />
          </ModelMain>
        </BtnCreate>
      )}
    </div>
  );
}
export default MyStoriesItemPage;
