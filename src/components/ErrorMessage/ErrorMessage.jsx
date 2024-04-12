const ErrorMessage = ({ message }) => {
  if (!message) {
    return <b>Something went wrong. Please refresh the page.</b>;
  }

  return <p style={{ color: 'red' }}>{message}</p>;
};

export default ErrorMessage;
