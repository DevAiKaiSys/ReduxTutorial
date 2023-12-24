import Link from "next/link";
import React from "react";

export const Navbar = () => {
  return (
    <nav>
      <section>
        <h1>Redux Essentials Example</h1>

        <div className="navContent">
          <div className="navLinks">
            <Link href="/">Posts</Link>
          </div>
        </div>
      </section>
    </nav>
  );
};
