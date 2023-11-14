import { Avatar, Button, Card, CardContent } from '@mui/material';
import Typography from '@mui/material/Typography';
import './styles.css';

const Invite = () => {
  return (
    <Card variant="outlined" sx={{ minWidth: 275 }} className="grid gap-5 max-w-full">
      <CardContent className="grid grid-rows-auto">
        <div className="flex items-center gap-x-4 mb-4">
          <Avatar />
          <p>Fulano</p>
        </div>
        <Typography variant="body1" fontWeight="500" className="text-stone-500 font-bold">
          Facebook
        </Typography>
        <Button
          variant="outlined"
          size="small"
          sx={{ justifySelf: 'right', maxWidth: 'max-content' }}
        >
          Acessar
        </Button>
      </CardContent>
    </Card>
  );
};

export default Invite;
