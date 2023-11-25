import { Link } from "react-router-dom";

const UndefinedRouteFallback = (
  <div>
    <span>
      Oops, unable to find resource of the given url. Go to{" "}
      <Link to={"."}>home</Link> to start your search!
    </span>
  </div>
);

export default UndefinedRouteFallback;
