import React, { useState } from 'react';
import { Navbar, NavLink, NavbarText, Dropdown, DropdownToggle, DropdownItem, DropdownMenu } from 'reactstrap';
import { useAppState } from '../common';

const Header = () => {
    const { user } = useAppState();
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const toggle = () => setDropdownOpen(current => !current);

    const navStyle = { 
        zIndex: 1,
        fontSize: '60%',
        letterSpacing: 'initial',
        color:'rgba(0,0,0,0.5)',
        right: '0px',
    }
    return (
        <Navbar style={navStyle} className="position-absolute">
            <Dropdown isOpen={dropdownOpen} toggle={toggle}>
                <DropdownToggle nav className="text-right">
                    <NavbarText><img className="w-50 rounded-circle opacity-3" src={user.photo} alt={user.displayName} /></NavbarText>
                </DropdownToggle>
                <DropdownMenu>
                    <DropdownItem header>{user.displayName}</DropdownItem>
                    <DropdownItem>
                        <NavLink className="text-dark" href="/auth/logout">Log Out</NavLink>
                    </DropdownItem>
                </DropdownMenu>
            </Dropdown>
        </Navbar>
    );
};

export default Header;