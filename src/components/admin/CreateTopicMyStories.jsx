import { yupResolver } from "@hookform/resolvers/yup";
import usePostStore from "../../stores/postStore";
import HeadForm from "../form/HeadForm";
import { useForm } from "react-hook-form";
import { schemaTopicPost } from "../../validator/topicPostSchema";
import { useState } from "react";
import { useRef } from "react";
import InputForm from "../form/InputForm";
import BtnAddImg from "./BtnAddImg";
import ShowImg from "./ShowImg";
import BtnForm from "../form/BtnForm";
import { Navigation } from "lucide-react";
import { AxiosError } from "axios";
import { toast } from "react-toastify";
import { CircleAlert } from "lucide-react";
import { useParams } from "react-router";

const initialInput = {
  nameTopic: "",
  detail: "",
};

function CreateTopicMyStories() {
  const post = usePostStore((state) => state.post);
  const actionCreateTopic = usePostStore((state) => state.actionCreateTopic);
  // console.log("post", post);

  const [files, setFiles] = useState([]);
  const fileInputRef = useRef(null);

  const { postId } = useParams();

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

  const removeFile = (idToRemove) => {
    console.log("idToRemove", idToRemove);
    const updatedFiles = files.filter((file) => file.id !== idToRemove);
    setFiles(updatedFiles);
  };

  const handleClickPic = () => {
    fileInputRef.current.click();
  };

  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
    reset,
  } = useForm({
    defaultValues: initialInput,
    shouldFocusError: true,
    resolver: yupResolver(schemaTopicPost),
  });

  const onSubmit = async (data) => {
    try {
      console.log("data", data);
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const formData = new FormData();
      formData.append("nameTopic", data.nameTopic);
      formData.append("detail", data.detail);

      files.forEach((file) => {
        formData.append("images", file);
      });

      await actionCreateTopic(postId, formData);
      // fetchUser();
      toast.success("Create Topic My Story success");
      document.getElementById("modal_create_topic_my_stories").close();
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
        countryName={post?.countryName}
        placeName={post?.placeName}
        text="Create"
        italicized="Topic My Stories"
        detail="Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste, consequuntur."
      />

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <InputForm
          isLoading={isSubmitting}
          register={register}
          name="nameTopic"
          placeholder="Please Enter your Name Topic"
          error={errors.countryName?.message}
        />

        <div>
          <textarea
            rows={2}
            // style={{ fieldSizing: "content" }}
            {...register("detail")}
            placeholder="Please Enter your Detail"
            className="w-full min-h-16 resize-none field-sizing-content bg-roamology/30 rounded-2xl py-2 px-4 outline-0 placeholder:text-roamology text-gray-600 hover:shadow-md hover:outline-1 hover:outline-roamology duration-100"
          ></textarea>
          {errors.detail?.message && (
            <p className="text-red-500 text-xs flex gap-0.5 items-center">
              <CircleAlert strokeWidth={1.8} width={14} />
              {errors.detail?.message}
            </p>
          )}
        </div>

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
              Create My Story
            </>
          )}
        </BtnForm>
      </form>
    </div>
  );
}
export default CreateTopicMyStories;
