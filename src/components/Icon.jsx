import PropTypes from 'prop-types';

const Icon = ({ icon, ...props }) => {
  const IconComponent = icon;
  return <IconComponent color="action" sx={{ marginRight: '0.5rem' }} {...props} />;
};

Icon.propTypes = {
  icon: PropTypes.object,
};

export default Icon;
