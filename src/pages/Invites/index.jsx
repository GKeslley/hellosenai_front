import {
  Box,
  Container,
  FormControl,
  Grid,
  InputAdornment,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Typography,
  useMediaQuery,
} from '@mui/material';
import ButtonComponent from '../../components/Button';
import SelectComponent from '../../components/Form/Select';
import { useState } from 'react';
import ModalCreateInvite from './Modal/ModalCreateInvite';
import ModalAccessInvite from './Modal/ModalAccessInvite';
import useQueryString from '../../hooks/useQueryString';
import useForm from '../../hooks/useForm';
import SearchIcon from '@mui/icons-material/Search';
import useInfiniteScroll from '../../hooks/useInfiniteScroll';
import InvitesItem from './InvitesItem';

const Invites = () => {
  const [openModalCreateInvite, setOpenModalCreateInvite] = useState(false);
  const [openModalAccessInvite, setOpenModalAccessInvite] = useState(false);
  const [dataInvite, setDataInvite] = useState(null);
  const modalCreateInvite = () => setOpenModalCreateInvite(true);
  const modalAccessInvite = () => setOpenModalAccessInvite(true);
  const { pages, infinite, setInfinite } = useInfiniteScroll();
  const isMobile = useMediaQuery('(min-width: 768px)');
  const searchInvite = useForm();
  const { url, onChangeOrder, onSearch, params } = useQueryString({
    search: 'titulo[lk]',
    input: searchInvite,
    baseUrl: 'http://127.0.0.1:8000/api/v1/convite',
  });

  return (
    <Container
      sx={{
        display: 'grid',
        gridTemplateColumns: isMobile ? 'auto 1fr' : '1fr',
        gap: '1rem',
        marginBottom: '2rem',
        marginTop: '2rem',
        position: 'relative',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          paddingRight: '1.5rem',
          gap: '1rem',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
            marginTop: !isMobile && '1.5rem',
          }}
        >
          <Typography component="h1" variant="h3" fontWeight="800">
            Convites
          </Typography>

          <FormControl
            sx={{ m: 0, width: '100%' }}
            variant="outlined"
            component="form"
            onSubmit={onSearch}
          >
            <InputLabel htmlFor="outlined-adornment-password">Buscar</InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              startAdornment={
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              }
              label="Buscar"
              size="small"
              onChange={searchInvite.onChange}
              value={searchInvite.value}
              fullWidth={true}
            />
          </FormControl>

          <ButtonComponent onClick={modalCreateInvite} sx={{ maxWidth: '100%' }}>
            Criar Convite
          </ButtonComponent>
        </Box>

        <Box
          sx={{
            display: 'flex',
            flexDirection: isMobile ? 'column' : 'row',
            gap: !isMobile ? '0rem' : '1rem',
            position: !isMobile && 'absolute',
            top: !isMobile && '-2rem',
            width: !isMobile && '100%',
            left: !isMobile && '0px',
            justifyContent: !isMobile && 'center',
            background: '#fff',
          }}
        >
          <SelectComponent
            label="Ordenar por:"
            sx={{ width: '100%' }}
            variant={!isMobile ? 'filled' : 'standard'}
            onChange={onChangeOrder}
            value={params.order}
          >
            <MenuItem value="DESC">Mais Recentes</MenuItem>
            <MenuItem value="ASC">Mais Antigos</MenuItem>
          </SelectComponent>
        </Box>
      </Box>
      <Grid component="article" container alignItems="stretch" wrap="wrap">
        <>
          {pages.map((page) => (
            <InvitesItem
              key={page}
              url={url}
              page={page}
              setInfinite={setInfinite}
              infinite={infinite}
              modalAccessInvite={modalAccessInvite}
              setDataInvite={setDataInvite}
              params={params}
            />
          ))}
        </>
      </Grid>

      {openModalCreateInvite && (
        <ModalCreateInvite
          openModal={openModalCreateInvite}
          setOpenModal={setOpenModalCreateInvite}
          title="Criar Convite"
          buttonTitle="Criar"
        />
      )}

      {openModalAccessInvite && (
        <ModalAccessInvite
          openModalAccessInvite={openModalAccessInvite}
          setOpenModalAccessInvite={setOpenModalAccessInvite}
          dataInvite={dataInvite}
        />
      )}
    </Container>
  );
};

export default Invites;
