import React from 'react';
import { Link } from 'react-router-dom';

export default () => {
    return (
        <nav>
            <div className="nav-wrapper">
                <ul className="right">
                    <li>
                        <Link to="/">Home page</Link>
                    </li>
                    <li>
                        <Link to="/products">Products</Link>
                    </li>
                    <li>
                        <Link to="/admin">Admin</Link>
                    </li>
                </ul>
            </div>

        </nav>
    )
}