import { TextareaAutosize as BaseTextareaAutosize } from '@mui/base/TextareaAutosize';
import { FormControl } from '@mui/material';
import { styled } from '@mui/system';

const TextArea = () => {
  const Textarea = styled(BaseTextareaAutosize)(
    () => `
    width: 320px;
    font-family: IBM Plex Sans, sans-serif;
    font-size: 0.875rem;
    font-weight: 400;
    line-height: 1.5;
    padding: 8px 12px;
    border: 1px solid #272727;
  

    &:hover {
      border-color: #2E7BEF;
    }

    &:focus {
      border-color: #2E7BEF;
    }

    // firefox
    &:focus-visible {
      outline: 0;
    }
  `,
  );

  return (
    <FormControl>
      <Textarea aria-label="minimum height" minRows={3} id="textarea" />
    </FormControl>
  );
};

export default TextArea;
