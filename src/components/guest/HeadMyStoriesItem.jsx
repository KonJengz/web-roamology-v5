import { CalendarRange } from "lucide-react";
import usePostStore from "../../stores/postStore";

import { DateTime } from "luxon";

function HeadMyStoriesItem() {
  const post = usePostStore((state) => state.post);
  // console.log("post", post);
  return (
    <div className=" flex flex-col gap-4 md:flex-center md:flex-row md:gap-10 lg:gap-16 xl:gap-22">
      {post.imgPost[0]?.imgUrl && (
        <div className="h-120 flex-1 md:h-140 overflow-hidden bg-gray-300">
          <img
            className="w-full h-120 md:h-140 object-cover hover:scale-105 duration-300"
            src={post.imgPost[0]?.imgUrl}
            alt={post.placeName}
          />
        </div>
      )}
      <div className="flex-1 flex flex-col">
        <h1 className="text-lg text-roamology">country: {post?.countryName}</h1>
        <h2 className="text-4xl text-gray-600 font-bold">{post?.placeName}</h2>
        {post.zone && <p className="text-sm text-gray-600">{post?.zone}</p>}
        {post.date && (
          <small className="text-sm text-gray-400 flex items-center gap-1">
            <CalendarRange width={16} />
            {DateTime.fromISO(post.date).toFormat("MMM dd yyyy")}
          </small>
        )}
      </div>
    </div>
  );
}
export default HeadMyStoriesItem;
