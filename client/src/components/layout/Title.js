import React from 'react';

const Title = () => {
    const styles = getStyles();
    return (
        <div style={styles.container}>
            <h1 style={styles.title}>PEOPLE AND THEIR CARS</h1>
        </div>
    );
};

const getStyles = () => ({
    container: {
        borderBottom: '1px solid rgba(0, 0, 0, 0.1)'
    },

    title: {
        fontSize: 25,
        padding: '30px 0 50px 0',

    }
});

export default Title;
