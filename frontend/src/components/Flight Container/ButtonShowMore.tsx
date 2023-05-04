import { useEffect } from "react";
import { ButtonShowMoreProps, TInitialListDisplay } from "../../types";

export const initialListDisplay: TInitialListDisplay = {
  first: 0,
  last: 10,
};

const ButtonShowMore = (props: ButtonShowMoreProps) => {
  const displayMoreFlights = () => {
    const plusTen = {
      ...props.display,
      last: props.display.last + 10,
    };
    props.setDisplay(plusTen);
  };

  useEffect(() => {
    props.getFlightItems();
  }, [props.display]);

  return (
    <button
      className="bg-gray-600 hover:bg-flyplanyellow text-white py-2 px-4 rounded-md"
      onClick={displayMoreFlights}
    >
      Show more
    </button>
  );
};

export default ButtonShowMore;
