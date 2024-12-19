import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';

function PageNotFound() {
    const navigate = useNavigate();
    const [, , removeCookie] = useCookies();

    const handleReturnHome = () => {
        localStorage.clear()
        removeCookie("jwt")
        navigate('/');
    };

    return (
        <div style={styles.container}>
            <h1 style={styles.heading}>Page Not Found</h1>
            <p style={styles.message}>Sorry, the page you are looking for does not exist.</p>
            <button style={styles.button} onClick={handleReturnHome}>
                Return to Home
            </button>
        </div>
    );
}

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '97vh',
        backgroundColor: '#f8f8f8',
        color: '#333',
        textAlign: 'center',
    },
    heading: {
        fontSize: '2.5rem',
        marginBottom: '1rem',
    },
    message: {
        fontSize: '1.2rem',
        color: '#666',
        marginBottom: '2rem',
    },
    button: {
        padding: '10px 20px',
        fontSize: '1rem',
        color: '#fff',
        backgroundColor: '#007BFF',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        textDecoration: 'none',
        transition: 'background-color 0.3s',
    },
    buttonHover: {
        backgroundColor: '#0056b3',
    },
};

export default PageNotFound;
