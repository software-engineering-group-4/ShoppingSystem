import React from 'react'

const Navbar = () => {
  return(
    <nav>
      <div class="nav-wrapper">
        <a href="#" class="brand-logo">Fake Grocers</a>
        <ul id="nav-mobile" class="right hide-on-med-and-down">
          <li><a href="#">Products</a></li>
          <li><a href="#">Login</a></li>
          <li><a href="#">Sign Up</a></li>
        </ul>
      </div>
    </nav>
  )
}

export default Navbar
