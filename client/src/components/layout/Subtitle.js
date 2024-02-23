const Subtitle = ({ subtitle }) => {
    const styles = getStyles();
    return <h1 style={styles.subtitle}>{subtitle}</h1>;
};

const getStyles = () => ({
    subtitle: {
        fontSize: 20,
        padding: '30px 0',
        // marginBottom: '20px',
    }
});

export default Subtitle;
