import { Box, Container, FormControl, Typography } from "@mui/material"
import Title from "../../../components/Title"
import HelperTeacher from "./HelperTeacher"
import Input from "../../../components/Form/Input";
import useForm from "../../../hooks/useForm";
import ButtonComponent from "../../../components/Button";
import { useMutation } from "react-query";
import axios from "axios";

const RegisterTeacher = () => {
    const name = useForm(true);
    const email = useForm('email');
    const password = useForm('password');

    const mutation = useMutation((dataLoginTeacher) => {
        return axios.post('http://127.0.0.1:8000/api/auth/login', dataLoginTeacher);
    });

    const sendMessage = () => {
        if (name.validate() && email.validate()) {
            mutation.mutate({
                nome: name.value,
                email: email.value,
                senha: password.value
            })
        }
    }

    return (
        <Box sx={{flexGrow: '1', position: 'relative'}}>
            <Container sx={{marginTop: '2rem', marginBottom: '2rem'}}>
                <Title sx={{marginBottom: '2rem'}}>Registro do Professor</Title>
                <Typography sx={{marginBottom: '1rem'}}>Coloque seus dados para entrarmos em contato</Typography>
                <FormControl sx={{width: '100%', display: 'flex', flexDirection: 'column', gap: '1rem'}}>
                    <Input 
                        error={name.error.isError}
                        required={true}
                        id="name"
                        fullWidth={true}
                        value={name.value}
                        onChange={name.onChange}
                        onBlur={name.onBlur}
                        helperText={name.error.isError && name.error.message}
                        label="Nome"
                        variant="standard"
                    />
                    <Input 
                        error={email.error.isError}
                        required={true}
                        id="email"
                        fullWidth={true}
                        value={email.value}
                        onChange={email.onChange}
                        onBlur={email.onBlur}
                        helperText={email.error.isError && email.error.message}
                        label="Email"
                        variant="standard"
                    />
                    <Input 
                        error={password.error.isError}
                        required={true}
                        id="password"
                        fullWidth={true}
                        value={password.value}
                        onChange={password.onChange}
                        onBlur={password.onBlur}
                        helperText={password.error.isError && password.error.message}
                        label="Senha"
                        variant="standard"
                        type="password"
                    />
                    <ButtonComponent 
                        onClick={sendMessage} 
                        sx={{marginBottom: '1rem'}}
                        isLoading={mutation.isLoading}
                    >
                        Enviar
                    </ButtonComponent>
                </FormControl>
                <HelperTeacher />
            </Container>
        </Box>
    );
}

export default RegisterTeacher