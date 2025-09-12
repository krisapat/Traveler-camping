import FormContainer from "@/components/Form/FormContainer"
import SubmitButtons from "@/components/Form/SubmitButtons"
import FormInput from "@/components/Form/FormInput"
import { createProfileAction } from "@/actions/actions"
import { currentUser } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"

const Create = async () => {
  const user = await currentUser()
  if (user?.privateMetadata.hasProfile) redirect("/")
  return (
    <section>
      <h1 className="text-2xl text-center font-bold mb-4 capitalize">
        New User Profile
      </h1>
      <div className="border p-4 rounded-md shadow-md">
        <FormContainer
          action={createProfileAction}
          className="flex flex-col max-w-md mx-auto"
          successMessage="Create Profile Successfully"
          failureMessage="Create Profile Failed"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-2">
            <FormInput
              name="firstName"
              label="First Name"
              type="text"
              placeholder="Enter your first name"
              className="space-y-2 w-full"
            />
            <FormInput
              name="lastName"
              label="Last Name"
              type="text"
              placeholder="Enter your last name"
              className="space-y-2 w-full"
            />
            <FormInput
              name="userName"
              label="Username"
              type="text"
              placeholder="Enter your username"
              className="space-y-2 w-full"
            />
          </div>
          <SubmitButtons
            type="submit"
            size="lg"
            text="Create Profile"
            className="shadow-md hover:scale-102 transition-transform duration-300"
          />
        </FormContainer>
      </div>
    </section>
  )
}
export default Create