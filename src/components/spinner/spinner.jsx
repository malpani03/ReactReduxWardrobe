import Spinner from 'react-bootstrap/Spinner';
import './spinner.scss';

const Spin = () => {
  return (
    <div className="spinner-container">
      <Spinner animation="border" role="status" className="spinner">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    </div>
  );
};

export default Spin;
