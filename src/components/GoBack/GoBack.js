import { useHistory } from "react-router-dom";

function GoBack() {
  const history = useHistory();

  return <button onClick={history.goBack}>Go back</button>;
}

export default GoBack;
