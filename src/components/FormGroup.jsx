import PropTypes from 'prop-types';
export default function FormGroup({ errorMessage = '', children }) {
  return (
    <div className=''>
      {children}
      {errorMessage.length > 0 && (
        <div className='my-1 font-medium text-red-500'>{errorMessage}</div>
      )}
    </div>
  );
}
FormGroup.propTypes = {
  children: PropTypes.node,
  errorMessage: PropTypes.string,
};
