import React, { useContext } from "react";
import UserContext from '../../context/context';
import { useRouter } from 'next/router'

interface Props { }

const SignUp: React.FC<Props> = () => {
  const router = useRouter()
  const authCtx = useContext(UserContext);
  const submitFormHandler = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    try {

      if (formData.get('username') && formData.get('email') && formData.get('password')) {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/create-user`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            username: formData.get('username'),
            email: formData.get('email'),
            password: formData.get('password')
          })
        })
        const data = await response.json();

        if (data?.success) {
          router.replace({
            pathname: '/sign-in',
            query: {
              message: 'success'
            }
          })
        }
      }
    } catch (error) {
      console.log("Error creating user.")
    }


  };

  return (
    <div className="bg-gray-dark max-w-xl my-md mx-auto">
      <form className="flex flex-col gap-s py-md px-xl" onSubmit={submitFormHandler}>
        <label className="text-white" htmlFor="submit-form-username">Username</label>
        <input className="text-xl font-medium outline-none h-xl px-xxs text-gray-dark" type="text" name="username" id="submit-form-username" />
        <label className="text-white" htmlFor="submit-form-email">Email</label>
        <input className="text-xl font-medium outline-none h-xl px-xxs text-gray-dark" type="email" name="email" id="submit-form-email" />
        <label className="text-white" htmlFor="submit-form-password">Password</label>
        <input className="text-xl font-medium outline-none h-xl px-xxs text-gray-dark" type="password" name="password" id="submit-form-password" />
        <button className="h-xl text-white hover:shadow-[inset_0_0_0_3px_#fff] transition-all duration-200" type="submit">Submit</button>
      </form>
    </div>
  );
};

export default SignUp;
