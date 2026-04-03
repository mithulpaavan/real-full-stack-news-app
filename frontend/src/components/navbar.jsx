import React from 'react'
import { Link } from 'react-router-dom'

function Navbar({logout, username}) {
  return (
    <nav className="navbar">
        <div className="logo">
            newsai
        </div>

        <div className="links">
            <Link to='/'>Home</Link>
            <Link to='/bookmarks'>Bookmarks</Link>
        </div>
        <div className="username">
            {username}
        </div>
        <div className="logout" onClick={logout}>
            logout
        </div>
    </nav>
  )
}

export default Navbar