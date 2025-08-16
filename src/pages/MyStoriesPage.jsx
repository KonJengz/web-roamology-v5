import useUserStore from "../stores/userStore";
import ShowMyStories from "../components/guest/ShowMyStories";
import BtnCreate from "../components/admin/BtnCreate";
import ModelMain from "../components/admin/ModelMain";
import CreateMyStories from "../components/admin/CreateMyStories";

function MyStoriesPage() {
  const user = useUserStore((state) => state.user);

  return (
    <div className="py-8">
      {user && (
        <BtnCreate text="Create My Stories" nameModal="modal_create_my_stories">
          <ModelMain modalName="modal_create_my_stories">
            <CreateMyStories />
          </ModelMain>
        </BtnCreate>
      )}
      <ShowMyStories />
    </div>
  );
}
export default MyStoriesPage;
