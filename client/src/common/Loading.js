import React from 'react';
import { Spinner } from 'reactstrap';
import './Loading.css';

const Loading = () => 
    <Spinner className="absolute-center" color="secondary" />;

export default Loading;