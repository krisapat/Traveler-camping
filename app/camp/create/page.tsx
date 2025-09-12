import FormContainer from "@/components/Form/FormContainer"
import SubmitButtons from "@/components/Form/SubmitButtons"
import FormInput from "@/components/Form/FormInput"
import { createLandmarkAction } from "@/actions/actions"
import CategoryInput from "@/components/createCamp/CategoryInput"
import TextAreaInput from "@/components/createCamp/TextAreaInput"
import ProvincesInput from "@/components/createCamp/ProvincesInput"
import MapLandmark from "@/components/map/MapLandmark"
import ImageInput from "@/components/createCamp/ImageInput"
import { redirect } from "next/navigation"
import { currentUser } from "@clerk/nextjs/server"

const Create = async () => {
  const user = await currentUser()
  if (!user?.privateMetadata?.isAdmin) redirect("/")
  return (
    <section>
      <h1 className="text-2xl text-center font-bold mb-4 capitalize">
        Create Landmark
      </h1>
      <div className="border p-4 rounded-md shadow-md">
        <FormContainer
          action={createLandmarkAction}
          className="flex flex-col max-w-xl mx-auto"
          successMessage="Create Landmark Successfully"
          failureMessage="Create Landmark Failed"
        >
          <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-2 mb-2">
            <FormInput
              name="name"
              label="Landmark Name"
              type="text"
              placeholder="Enter the landmark name"
              className="space-y-2 w-full"
            />
            {/* Category Input */}
            <CategoryInput />

          </div>
          {/* Description Input */}
          <TextAreaInput
            name="description"
            Labeltext="Description"
            defaultValue="Enter a description"
          />
          <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-2 mb-2">
            <FormInput
              name="price"
              label="Price"
              type="number"
              placeholder="Enter the price"
              className="space-y-2 w-full"
            />
            <ProvincesInput />
          </div>

          <ImageInput />
          <MapLandmark
            className="h-64 w-full rounded-md mb-2 z-0 relative border border-gray-300"
          />

          <SubmitButtons
            type="submit"
            size="lg"
            text="Create Landmark"
            className="shadow-md hover:scale-102 transition-transform duration-300"
          />
        </FormContainer>
      </div>
    </section>
  )
}
export default Create