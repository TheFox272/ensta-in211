import React from 'react'
import { useState } from 'react'
import { AvatarButton } from '../AvatarButton/AvatarButton'
import AddUserForm from '../AddUserForm/AddUserForm';
import UsersTable from '../UsersTable/UsersTable';


const GridAvatar = ({ color }) => {
    const [buttonColors, setButtonColors] = useState(color);

    // Function to update button colors array
    const updateButtonColors = (index, col) => {
        const updatedColors = [...buttonColors];
        updatedColors[index] = col;
        console.log(updatedColors);
        setButtonColors(updatedColors);
    };

    return (
        <div>
            {/* Render AvatarButton components and pass index and updateButtonColors function */}
            {buttonColors.map((col, index) => (
                <AvatarButton
                    key={index}
                    color={col}
                    index={index}
                    updateButtonColors={(col) => updateButtonColors(index, col)}
                />
            ))}
            {/* Render list of stacked colors */}
        </div>
    );
};

export default GridAvatar;
