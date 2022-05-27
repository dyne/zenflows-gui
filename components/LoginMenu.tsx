import Link from "next/link";
import {useAuth} from "../lib/auth";
import React from "react";

export default function LoginBtn() {
      const { isSignedIn, signOut } = useAuth()

    return (
      <>
            <div className="dropdown dropdown-end">
                <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                    {isSignedIn()? <div className="w-10 rounded-full">
                        <img src="https://api.lorem.space/image/face?hash=33791"/>
                    </div> :
                        <div className="w-10 rounded-full">
                        <img src="https://via.placeholder.com/150"/>
                    </div>}
                </label>
                {isSignedIn()? <ul tabIndex={0}
                    className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52">
                    <li><button className="btn" onClick={() => signOut()}>Sign Out</button></li>
                </ul> : <ul tabIndex={0}
                    className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52">
                    <li>
                        not logged in
                    </li>
                    <li><Link href='/sign_in'><a className="btn">Login</a></Link></li>
                </ul> }
            </div>
      </>
    )
}
