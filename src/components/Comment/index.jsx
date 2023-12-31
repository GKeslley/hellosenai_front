import { Box, Paper, Typography } from '@mui/material';
import ChatBubbleOutlineRoundedIcon from '@mui/icons-material/ChatBubbleOutlineRounded';
import PropTypes from 'prop-types';
import CommentActions from './CommentActions';
import CommentInput from './CommentInput';
import useForm from '../../hooks/useForm';
import { useMutation } from 'react-query';
import axios from 'axios';
import AvatarUser from '../Avatar';

const Comment = ({
  id,
  text,
  date,
  user,
  sx,
  isReply = false,
  openReply,
  setOpenReply,
  slug,
  queryClient,
  replies,
  isChild,
}) => {
  const reply = useForm();

  const mutation = useMutation({
    mutationFn: ({ data, token }) => {
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };

      return axios.post(
        `http://127.0.0.1:8000/api/v1/projeto/${slug}/comentario`,
        data,
        config,
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['project'], type: 'active' });
      handleCloseComment();
    },
  });

  const handleCloseComment = () => {
    reply.setValue('');
    setOpenReply({ isOpen: false, id: null });
  };

  const handleOpenComment = () => {
    setOpenReply({ isOpen: true, id });
  };

  const postReplyComment = () => {
    const token = localStorage.getItem('token');
    const data = {
      texto: reply.value,
      comentarioPai: openReply.id,
    };
    mutation.mutate({ data, token });
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: '0.125rem',
        margin: isChild ? '10px 0px 10px 46px' : '0',
        ...sx,
      }}
      id={id}
    >
      <Box sx={{ display: 'flex', gap: '1rem', alignItems: 'start' }}>
        <AvatarUser avatar={user.avatar} sx={{ width: '30px', height: '30px' }} />
        <Paper sx={{ width: '100%' }} elevation={0}>
          <Box
            sx={{
              display: 'flex',
              gap: '0.5rem',
              alignItems: 'center',
              marginBottom: '0.2rem',
            }}
          >
            <Typography sx={{ fontWeight: '800' }}>{user.nome}</Typography>

            <Typography
              component="span"
              fontSize="0.5rem"
              className="bg-gray-400 h-1 w-1 rounded-full mx-2"
            ></Typography>

            <Typography component="time" fontSize="0.9rem" className="text-gray-400">
              {date}
            </Typography>
          </Box>

          <Typography>{text}</Typography>
        </Paper>
      </Box>
      {!isReply && (
        <Box
          sx={{
            display: 'flex',
            gap: '0.25rem',
            alignItems: 'center',
            maxWidth: `${openReply.isOpen ? '100%' : 'max-content'}`,
            marginLeft: 'calc(46px - 0.3rem)',
            padding: '0.3rem',
            borderRadius: '4px',
            ':hover': !openReply.isOpen && {
              backgroundColor: '#efefef',
              transition: '0.3s',
            },
          }}
        >
          {openReply.isOpen && id === openReply.id ? (
            <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
              <CommentInput input={reply} />
              <CommentActions
                handleCloseComment={handleCloseComment}
                input={reply}
                onClick={postReplyComment}
                isLoading={mutation.isLoading}
              />
            </Box>
          ) : (
            <>
              <ChatBubbleOutlineRoundedIcon
                sx={{ fontSize: '0.875rem', fill: '#3d3d3d' }}
              />
              <Typography
                sx={{ fontSize: '0.875rem', color: '#3d3d3d' }}
                onClick={handleOpenComment}
              >
                Responder
              </Typography>
            </>
          )}
        </Box>
      )}

      {replies.length > 0 &&
        replies.map(({ idcomentario, criadoEm, texto, usuario, resposta }) => (
          <Comment
            key={idcomentario}
            id={idcomentario}
            text={texto}
            date={criadoEm}
            user={usuario}
            openReply={openReply}
            setOpenReply={setOpenReply}
            slug={slug}
            queryClient={queryClient}
            replies={resposta}
            isChild={true}
          />
        ))}
    </Box>
  );
};

Comment.propTypes = {
  id: PropTypes.number,
  text: PropTypes.string,
  date: PropTypes.string,
  user: PropTypes.object,
  sx: PropTypes.object,
  queryClient: PropTypes.object,
  isReply: PropTypes.bool,
  openReply: PropTypes.object,
  setOpenReply: PropTypes.func,
  config: PropTypes.object,
  slug: PropTypes.string,
  replies: PropTypes.array,
  isChild: PropTypes.bool,
};

export default Comment;
