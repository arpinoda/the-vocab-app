import React from 'react';
import { Navbar, NavbarText } from 'reactstrap';
import { useAppState } from '../common';

const Header = () => {
    const { user } = useAppState();
    return (
        <Navbar>
            <NavbarText className="text-light">{user.displayName}</NavbarText>
            <NavbarText><a className="text-light" href="/auth/logout">Log Out</a></NavbarText>
        </Navbar>
    );
};

export default Header;