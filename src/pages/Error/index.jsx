import { Container, Typography, useMediaQuery } from "@mui/material";
import Title from "../../components/Title";

const Error = ({message, statusCode}) => {
    const isMobile = useMediaQuery('(max-width: 768px)')

    return (
        <Container sx={{textAlign: 'center', flexGrow: '1', display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
            <Title sx={{fontSize: isMobile ? '10rem' : '20rem', lineHeight: '1'}}>{statusCode}</Title>
            <Typography fontSize='1.5rem' textTransform='uppercase'>{message}</Typography>
        </Container>
    );
}

export default Error