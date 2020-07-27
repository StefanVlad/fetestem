import React from 'react';

const Home = () => {
    return (
        <div>
            <div>Hello world!</div>
            <button onClick={() => {
                console.log('Button click worked');
            }}> Press me! </button>
        </div>
    )
};

export default Home;