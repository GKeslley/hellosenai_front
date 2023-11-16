import Subtitle from '../../Subtitle';
import { Box, Container, Paper } from '@mui/material';
import { styled } from '@mui/material/styles';
import mundosenaiImage from '../../../assets/home/mundosenai.png';
import senaiImage from '../../../assets/home/senai.png';
import meusenaiImage from '../../../assets/home/meusenai.png';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

const DemoPaper = styled(Paper)(({ theme }) => ({
  width: 100,
  height: 100,
  padding: theme.spacing(1),
  borderRadius: '50%',
  display: 'grid',
  transition: '0.3s',
  cursor: 'pointer',
  border: '1px solid transparent',
  ':hover': {
    borderColor: '#ccc',
  },
}));

const Advertising = ({ refAdvertising }) => {
  const navigate = useNavigate();

  const toPage = (url) => {
    navigate(url);
  };

  return (
    <Container ref={refAdvertising}>
      <Box>
        <Subtitle sx={{ marginBottom: '2.5rem' }}>Mais Senai</Subtitle>
        <ul className="flex items-center gap-6 justify-between">
          <li onClick={() => toPage('mundosenai.com')}>
            <DemoPaper variant="elevation">
              <img
                src={mundosenaiImage}
                alt="Logo do site mundo senai"
                className="object-cover self-center"
              />
            </DemoPaper>
          </li>
          <li onClick={() => toPage('senai.com')}>
            <DemoPaper variant="elevation">
              <img
                src={senaiImage}
                alt="Logo do senai"
                className="object-cover self-center"
              />
            </DemoPaper>
          </li>
          <li onClick={() => toPage('mundosenai.com')}>
            <DemoPaper variant="elevation">
              <img
                src={meusenaiImage}
                alt="Logo do site meu senai"
                className="object-cover self-center"
              />
            </DemoPaper>
          </li>
        </ul>
      </Box>
    </Container>
  );
};

export default Advertising;

Advertising.propTypes = {
  refAdvertising: PropTypes.object,
};
