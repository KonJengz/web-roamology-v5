import { createBrowserRouter, Navigate, RouterProvider } from "react-router";
import MainLayout from "../layout/MainLayout";
import AboutMePage from "../pages/AboutMePage";
import MyStoriesPage from "../pages/MyStoriesPage";
import useUserStore from "../stores/userStore";
import { useEffect } from "react";
import MyStoriesItemPage from "../pages/MyStoriesItemPage";
import GermanPage from "../pages/GermanPage";

const mainRouter = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <MyStoriesPage /> },
      { path: "aboutme", element: <AboutMePage /> },
      {
        path: "stories/:countryName/:placeName/:postId",
        element: <MyStoriesItemPage />,
      },
      { path: "german", element: <GermanPage /> },
      { path: "*", element: <Navigate to="/" replace /> },
    ],
  },
]);

function AppRouter() {
  const accessToken = useUserStore((state) => state.accessToken);
  const fetchUser = useUserStore((state) => state.fetchUser);

  useEffect(() => {
    if (accessToken) {
      fetchUser();
    } else {
      useUserStore.setState({ isLoading: false });
    }
  }, [accessToken, fetchUser]);

  return <RouterProvider router={mainRouter} />;
}
export default AppRouter;
