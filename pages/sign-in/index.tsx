import React, { useContext } from "react";
import UserContext from '../../context/context';
import { useRouter } from 'next/router'

interface Props { }
// userData.username || !userData.email || !userData.password

const SignIn: React.FC<Props> = () => {
  const router = useRouter();
  console.log("ROUTER: ", router)

  const authCtx = useContext(UserContext);
  const submitFormHandler = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    // console.log("formValue1", formData.get("username"));
    // console.log("formValue2", formData.get("email"));
    // console.log("formValue3", formData.get("password"));

    // const response = await fetch('/api/signIn-user', {
    //   method: "POST",
    //   headers: {
    //     'content-type': 'Application/json'
    //   },
    //   body: JSON.stringify({
    //     email: formData.get("email"),
    //     password: formData.get("password")
    //   })
    // })

    // const data = await response.json();

    // console.log("DATA: ", data)

    try {
      authCtx.signIn(formData.get("email") as string, formData.get("password") as string)
      router.replace('/')
    } catch (error) {
      console.log("Error signing user in.")
    }


  };

  return (
    <div className="bg-gray-dark max-w-xl my-md mx-auto">
      {
        router?.query?.message === 'success' ? (
          <div className="p-s mb-s text-sm text-teal-700 bg-teal-100 rounded-md dark:bg-teal-200 dark:text-teal-900" role="alert">
            <span className="font-md">Successful registration!</span> Fill in your information and log in.
          </div>
        ) : null
      }
      <form className="flex flex-col gap-s py-md px-xl" onSubmit={submitFormHandler}>
        <label className="text-white" htmlFor="submit-form-email">Email</label>
        <input className="text-xl font-medium outline-none h-xl px-xxs text-gray-dark" type="email" name="email" id="submit-form-email" />
        <label className="text-white" htmlFor="submit-form-password">Password</label>
        <input className="text-xl font-medium outline-none h-xl px-xxs text-gray-dark" type="password" name="password" id="submit-form-password" />
        <button className="h-xl text-white hover:shadow-[inset_0_0_0_3px_#fff] transition-all duration-200" type="submit">Submit</button>
      </form>
    </div>
  );
};

export default SignIn;
