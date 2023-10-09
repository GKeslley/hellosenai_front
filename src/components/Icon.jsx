import PropTypes from 'prop-types';

const Icon = ({ icon }) => {
  const IconComponent = icon;
  return <IconComponent color="action" sx={{ marginRight: '0.5rem' }} />;
};

Icon.propTypes = {
  icon: PropTypes.object,
};

export default Icon;
