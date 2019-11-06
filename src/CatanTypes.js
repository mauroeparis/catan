import PropTypes from "prop-types";

const RESOURCES = ["brick", "lumber", "wool", "grain", "ore"];
const DEV_CARDS = [
  "road_building",
  "year_of_plenty",
  "monopoly",
  "victory_point",
  "knight"
];

const CatanTypes = {
  VertexPosition: PropTypes.shape({
    level: PropTypes.number.isRequired,
    index: PropTypes.number.isRequired
  }),
  Resource: PropTypes.oneOf(RESOURCES),
  Card: PropTypes.oneOf(DEV_CARDS),
  Room: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    owner: PropTypes.string.isRequired,
    max_players: PropTypes.number.isRequired,
    players: PropTypes.arrayOf(PropTypes.string).isRequired
  }),
  Terrain: PropTypes.oneOf(["desert", ...RESOURCES])
};

CatanTypes.HexPosition = CatanTypes.VertexPosition;
CatanTypes.Hex = PropTypes.shape({
  position: CatanTypes.HexPosition.isRequired,
  terrain: CatanTypes.Terrain.isRequired,
  token: PropTypes.number.isRequired
});
// TODO: only size two arrays (tuples) should be allowed in RoadPosition
CatanTypes.RoadPosition = PropTypes.arrayOf(CatanTypes.VertexPosition);

export { RESOURCES, DEV_CARDS };
export default CatanTypes;
