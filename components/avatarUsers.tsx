import React from 'react';
import Link from "next/link";

const AvatarUsers = ({users}: { users: Array<{ displayUsername: string, id: string }> }) => {
    return <div className="avatar-group -space-x-6 h-20 w-32">
        {users.map((u, i) => <>
            {(i<4)&&<Link key={u?.id} href={`/profile/${u?.id}`}>
            <a>
                <div className="avatar">
                    <div className="w-9 hover:w-11">
                        <img src={`https://api.lorem.space/image/face?hash=${u?.id}`} alt={u.displayUsername}/>
                    </div>
                </div>
            </a>
        </Link>}</>)}
    </div>
}
export default AvatarUsers