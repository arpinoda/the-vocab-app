import React from 'react';
import { Spinner } from 'reactstrap';

const style = {
    left: '50%',
    top: '50%',
    marginLeft: '-1rem',
    marginTop: '-1rem'
};

const Loading = () => (
    <Spinner type="grow" style={style} className="position-absolute" color="secondary" />
);

export default Loading;
