const Subtitle = ({ subtitle }) => {
    const styles = getStyles();
    return <h1 style={styles.subtitle}>{subtitle}</h1>;
};

const getStyles = () => ({
    subtitle: {
        fontSize: 18,
        padding: '15px',
        marginBottom: '30px'
    }
});

export default Subtitle;
