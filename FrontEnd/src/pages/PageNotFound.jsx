import { useNavigate, NavLink } from "react-router-dom";

const PageNotFound = () => {
  const navigate = useNavigate();

  return (
    <div>
      <h1>Page Not Found</h1>
      <p>What were you looking for? Maybe going back will help you find it</p>
      <NavLink to="/">Home</NavLink>
      <button fontSize="xl" onClick={() => navigate(-1)}>
        Back
      </button>
    </div>
  );
};

export default PageNotFound;
