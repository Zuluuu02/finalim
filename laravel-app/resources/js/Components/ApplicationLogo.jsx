export default function ApplicationLogo(props) {
    return (
        <img 
            {...props} 
            src="/sunshine.png" 
            alt="Application Logo" 
            style={{ width: '70px', height: 'auto' }}
        />
    );
}
