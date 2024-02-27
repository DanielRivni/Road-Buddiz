import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import { GetTerms } from '../middleware/firestore/users';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

const TitleWrapper = styled('div')({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});

export default function CustomizedDialogs({ handleSignup }) {
  const [open, setOpen] = useState(false);
  const [terms, setTerms] = useState([]);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleSave = () => {
    handleSignup();
    setOpen(false);
  }

  useEffect(() => {
    const fetchTerms = async () => {
      const termsArray = await GetTerms();
      setTerms(termsArray);
    };

    fetchTerms();
  }, []);

  return (
    <React.Fragment>
      <Button
        className="signup-page-card-actions-button"
        variant="contained"
        color="primary"
        onClick={handleClickOpen}>
        הירשם
      </Button>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <TitleWrapper>
          <DialogTitle id="customized-dialog-title" sx={{ fontSize: '1.4rem' }}>
            תנאי שימוש
          </DialogTitle>
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        </TitleWrapper>
        <DialogContent dividers>
          {terms.map((term, index) => (
            <Typography key={index} sx = {{marginBottom: 2}}>
              {term}
            </Typography>
          ))}
        </DialogContent>
        <DialogActions style={{ justifyContent: 'center' }}>
          <Button autoFocus onClick={handleSave} sx={{ fontSize: '1.2rem' }}>
            אישור תנאים
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </React.Fragment>
  );
}
