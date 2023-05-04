import Search from "../components/Search/Search";
import { FlightContainer } from "../components/Flight Container/FlightContainer";
import { useSelector } from "react-redux";
import { RootState } from "../state/store";
import Landing from "../components/Flight Container/Landing";

export const Home = () => {
  const searchState = useSelector(
    (state: RootState) => state.searchReducer.sendClicked
  );

  return (
    <div className="sm:mx-10 md:mx-40 lg:mx-50 mx-auto">
      <br />
      <Search />
      {!searchState ? <Landing /> : <FlightContainer />}
    </div>
  );
};
