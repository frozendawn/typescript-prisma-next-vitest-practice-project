import Image from "next/image";
import UserContext from "../../context/context";
import { useState, useContext } from "react";
import { useRouter } from "next/router";



const UserOptions = () => {
  const [visible, setVisible] = useState<boolean>(false);
  const { signOut, user } = useContext(UserContext);
  const router = useRouter();

  const userOptions = () => {
    return (
      <div className="bg-white inline-block mt-xxs p-xxs flex flex-col gap-xxs w-max absolute left-negative-50">
        {user?.role === 'ADMIN' ?
          <>
            <p className="text-blue cursor-pointer" onClick={() => { router.push('new-item') }}>New item</p>
            <p className="text-blue cursor-pointer">New category</p>
          </>
          : null}
        <p className="text-blue cursor-pointer" onClick={() => { signOut() }}>Logout</p>
      </div>
    )
  }

  return (
    <div className="bg-orange h-xxl w-xxl rounded mr-xl relative">
      <Image src="/person-icon.svg" alt="dashboard person icon" width="64" height="64" className="cursor-pointer" onClick={() => setVisible(prev => !prev)} />
      {
        visible ? userOptions() : null
      }
    </div>
  )
}

export default UserOptions;