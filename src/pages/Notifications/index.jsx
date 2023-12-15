import { useQuery } from 'react-query';
import NotificationsItem from './NotificationsItem';
import axios from 'axios';
import Loading from '../../components/Helper/Loading';
import Title from '../../components/Title';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { Container } from '@mui/material';

const Notifications = () => {
  const config = {
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
  };

  const { data, isLoading, error } = useQuery('notifications', () => {
    return axios
      .get('http://127.0.0.1:8000/api/v1/usuario/convites/notificacoes', config)
      .then((response) => response.data);
  });

  console.log(data);

  if (isLoading) <Loading />;
  return (
    <Container sx={{ marginTop: '2rem', marginBottom: '2rem' }}>
      <Title sx={{ marginBottom: '1rem' }}>
        Notificações
        <NotificationsIcon
          sx={{ width: '3rem', height: '3rem', marginLeft: '0.25rem' }}
        />
      </Title>
      {data &&
        data.data.map(({ mensagem, enviadoEm, remetente }, i) => (
          <NotificationsItem key={i} data={{ mensagem, enviadoEm, remetente }} />
        ))}
    </Container>
  );
};

export default Notifications;
