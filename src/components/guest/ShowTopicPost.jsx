import usePostStore from "../../stores/postStore";
import BtnEditDelete from "../admin/BtnEditDelete";

function ShowTopicPost({ id }) {
  const topics = usePostStore((state) => state.topics);
  const postAdmin = usePostStore((state) => state.postAdmin);
  const post = usePostStore((state) => state.post);
  //   const setTopic = usePostStore((state) => state.setTopic);
  const actionDeleteTopicPost = usePostStore(
    (state) => state.actionDeleteTopicPost
  );
  const handleClickDelete = async (e, topicId) => {
    e.stopPropagation();
    await actionDeleteTopicPost(id, topicId);
  };

  //   const handleClickEdit = async (e, topic) => {
  //     e.stopPropagation();
  //     setTopic(topic);
  //   };

  return (
    <div className="space-y-8 mb-12">
      {topics.map((topic) => (
        <div key={topic.id} className="flex flex-col gap-4 relative">
          <div className="flex-1">
            <div>
              <h2 className="text-2xl text-roamology font-bold mb-2">
                {topic.nameTopic}
              </h2>
              <p className="text-sm text-gray-600">{topic.detail}</p>
            </div>

            {postAdmin.some((p) => p.id === post.id) && (
              <BtnEditDelete
                handleClickDelete={(e) => handleClickDelete(e, topic.id)}
              />
            )}
          </div>
          {topic?.imgTopicPost[0]?.imgUrl && (
            <div className="h-120 flex-1 overflow-hidden bg-gray-300">
              <img
                className="w-full h-120 md:h-80 object-cover"
                src={topic?.imgTopicPost[0]?.imgUrl}
                alt={topic.nameTopic}
              />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
export default ShowTopicPost;
