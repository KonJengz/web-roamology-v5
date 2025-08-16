import { toast } from "react-toastify";
import InputForm from "../form/InputForm";
import { AxiosError } from "axios";
import BtnForm from "../form/BtnForm";
import { Navigation } from "lucide-react";
import { useState } from "react";
import usePostStore from "../../stores/postStore";
import { useRef } from "react";
import HeadForm from "../form/HeadForm";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { schemaPost } from "../../validator/postSchema";
import useUserStore from "../../stores/userStore";
import BtnAddImg from "./BtnAddImg";
import ShowImg from "./ShowImg";
import postApi from "../../api/post";

function UpdateMyStories() {
  const actionUpdatePost = usePostStore((state) => state.actionUpdatePost);
  const post = usePostStore((state) => state.post);
  const fetchUser = useUserStore((state) => state.fetchUser);

  console.log("post", post);

  const [files, setFiles] = useState(post?.imgPost || []);
  const fileInputRef = useRef(null);

  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
    reset,
  } = useForm({
    defaultValues: {
      countryName: post?.countryName || "",
      placeName: post?.placeName || "",
      zone: post?.zone || "",
      date: post?.date || null,
    },
    shouldFocusError: true,
    resolver: yupResolver(schemaPost),
  });

  const handleFileChange = (e) => {
    const newFiles = Array.from(e.target.files).map((file, index) => {
      file.id = Date.now() + index;
      return file;
    });
    setFiles((prevFiles) => [...prevFiles, ...newFiles]);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  console.log("files", files);

  const removeFile = async (idToRemove) => {
    console.log("idToRemove", idToRemove);
    const updatedFiles = files.filter((file) => file.id !== idToRemove);
    setFiles(updatedFiles);

    await postApi.deleteImgPost(post.id, idToRemove);
  };

  const handleClickPic = () => {
    fileInputRef.current.click();
  };

  const onSubmit = async (data) => {
    try {
      console.log("data", data);
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const formData = new FormData();
      formData.append("countryName", data.countryName);
      formData.append("placeName", data.placeName);
      formData.append("zone", data.zone);
      formData.append("date", data.date);

      files.forEach((file) => {
        formData.append("images", file);
      });

      await actionUpdatePost(post.id, formData);
      // fetchUser();
      toast.success("update My Story success");
      document.getElementById("modal_edit_my_stories").close();
      reset();
      setFiles([]);
    } catch (error) {
      console.log(error);

      if (error instanceof AxiosError) {
        toast.error(error.response.data.message);
      }
    }
  };

  return (
    <div className="space-y-4">
      <HeadForm
        text="Update"
        italicized="My Stories"
        detail="Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste, consequuntur."
      />

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <InputForm
          isLoading={isSubmitting}
          register={register}
          name="countryName"
          placeholder="Please Enter your Country Name"
          error={errors.countryName?.message}
        />

        <InputForm
          isLoading={isSubmitting}
          register={register}
          name="placeName"
          placeholder="Please Enter your Place Name"
          error={errors.placeName?.message}
        />

        <InputForm
          isLoading={isSubmitting}
          register={register}
          name="zone"
          placeholder="Please Enter your zone"
          error={errors.zone?.message}
        />

        <InputForm
          isLoading={isSubmitting}
          register={register}
          name="date"
          placeholder="Please Enter your zone"
          error={errors.date?.message}
          type="date"
        />

        <div className="divider"></div>

        {/* Image Upload Section */}
        <div>
          <input
            type="file"
            multiple
            className="hidden"
            ref={fileInputRef} // 2. ผูก ref เข้ากับ input element
            onChange={handleFileChange}
            accept="image/*" // เพิ่มเพื่อจำกัดให้เลือกเฉพาะไฟล์รูปภาพ
          />

          {/* show image */}
          {files.length > 0 && (
            <ShowImg files={files} removeFile={removeFile} />
          )}

          <BtnAddImg
            isSubmitting={isSubmitting}
            handleClickPic={handleClickPic}
          />
        </div>
        <BtnForm isLoading={isSubmitting}>
          {isSubmitting ? (
            <>
              <span className="loading w-4 h-4 text-sm loading-spinner text-roamology"></span>
              Loading...
            </>
          ) : (
            <>
              <Navigation width={20} />
              Update My Story
            </>
          )}
        </BtnForm>
      </form>
    </div>
  );
}
export default UpdateMyStories;
