import React, { useContext } from "react";
import UserContext from '../../context/context';

interface Props {}
// userData.username || !userData.email || !userData.password

const SignIn: React.FC<Props> = () => {

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

    authCtx.signIn(formData.get("email") as string, formData.get("password") as string)


  };

  return (
    <div className="flex flex-col">
      <form onSubmit={submitFormHandler}>
        <label htmlFor="submit-form-email">Email</label>
        <input type="email" name="email" id="submit-form-email" />
        <label htmlFor="submit-form-password">Password</label>
        <input type="text" name="password" id="submit-form-password" />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default SignIn;
