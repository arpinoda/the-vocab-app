import React from 'react';
import PropTypes from 'prop-types';

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props)
        this.state = { error: null, errorInfo: null }
    }

    static getDerivedStateFromError(error) {
        return { error }
    }

    componentDidCatch(error, errorInfo) {
        this.setState({ error, errorInfo });
    }

    render() {
        if (this.state.error) {
            const { fallback: Fallback, onRetry } = this.props;
            
            return (
                <Fallback
                    error={this.state.error}
                    resetErrorBoundary = {() => {
                        this.setState({
                            error: null,
                            errorInfo: null
                        });
                        onRetry && onRetry();
                    }}
                />
            );
        }

        return this.props.children
    }
}

ErrorBoundary.defaultProps = {
    fallback: <h1>Something went wrong.</h1>,
}

ErrorBoundary.propTypes = {
    fallback: PropTypes.func,
    onRetry: PropTypes.func,
}

export default ErrorBoundary;