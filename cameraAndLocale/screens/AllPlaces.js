import { useEffect, useState } from "react";
import PlacesList from "../components/Places/PlacesList";
import { fetchPlaces } from "../util/database";
import { useIsFocused } from "@react-navigation/native";

const AllPlaces = () => {
  const [places, setPlaces] = useState([]);

  const isFocused = useIsFocused();

  useEffect(() => {
    const loadPlaces = async () => {
      const places = await fetchPlaces();
      setPlaces(places);
    };
    if (isFocused) {
      loadPlaces();
    }
  }, [isFocused]);

  return <PlacesList places={places} />;
};

export default AllPlaces;
