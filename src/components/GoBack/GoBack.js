import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";

function GoBack({ to, label }) {
  const history = useHistory();

  const onGoBack = () => {
    history.push(to);
  };

  return (
    <button type="button" onClick={onGoBack}>
      {label ?? "Go home"}
    </button>
  );
}

GoBack.propTypes = {
  to: PropTypes.object.isRequired,
  label: PropTypes.string.isRequired,
};

export default GoBack;
