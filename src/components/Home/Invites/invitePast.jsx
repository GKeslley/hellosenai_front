import { Box, Button, MobileStepper, Paper, Typography, useTheme } from '@mui/material';
import { useState } from 'react';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';
import { KeyboardArrowLeft, KeyboardArrowRight } from '@mui/icons-material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Icon from '../../Icon';

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const invites = [
  {
    label: 'Facebook',
    autor: 'lekzin',
  },
  {
    label: 'Google INOVA',
    autor: 'filipe',
  },
  {
    label: 'Classroom 2',
    autor: 'madrugain',
  },
  {
    label: 'FMAIL',
    autor: 'peo',
  },
];

const Invites = () => {
  const theme = useTheme();
  const [activeStep, setActiveStep] = useState(0);
  const maxSteps = invites.length;

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStepChange = (step) => {
    setActiveStep(step);
  };

  return (
    <Box sx={{ maxWidth: 400, flexGrow: 1 }}>
      <Paper square elevation={0} sx={{ borderRadius: '6px' }} className="py-2">
        <Box className="flex flex-col gap-4 px-4">
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              borderBottom: '1px solid #e0e0e0',
              paddingTop: '1rem',
              paddingBottom: '0.5rem',
            }}
          >
            <Box sx={{ display: 'flex' }}>
              <Icon icon={AccountCircleIcon} />
              <Typography>{invites[activeStep].autor}</Typography>
            </Box>
          </Box>
          <AutoPlaySwipeableViews
            axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
            index={activeStep}
            onChangeIndex={handleStepChange}
            enableMouseEvents
          >
            {invites.map((step, index) => (
              <div key={step.label}>
                {Math.abs(activeStep - index) <= 2 ? (
                  <Typography>{step.label}</Typography>
                ) : null}
              </div>
            ))}
          </AutoPlaySwipeableViews>
        </Box>
        <MobileStepper
          steps={maxSteps}
          position="static"
          activeStep={activeStep}
          sx={{ borderRadius: '6px' }}
          nextButton={
            <Button
              size="small"
              onClick={handleNext}
              disabled={activeStep === maxSteps - 1}
            >
              Próximo
              {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
            </Button>
          }
          backButton={
            <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
              {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
              Anterior
            </Button>
          }
        />
      </Paper>
    </Box>
  );
};

export default Invites;
