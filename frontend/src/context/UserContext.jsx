
import React, { createContext } from 'react'

export const UserContext = createContext()

function UserContext({ children }) {


    const [user, setUser] = useState({
        email: '',
        fullname: {
            firstname: '',
            lastname: ''
        }
    })

    return (
        <div>
            <UserContext.Provider value={[user, setUser]}>
                {children}
            </UserContext.Provider>
        </div>
    )
}

export default UserContext