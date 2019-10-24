import PropTypes from "prop-types";

const CatanTypes = {
  VertexPosition: PropTypes.shape({
    level: PropTypes.number.isRequired,
    index: PropTypes.number.isRequired
  }),
  Resource: PropTypes.oneOf(["brick", "lumber", "wool", "grain", "ore"]),
  amounts: PropTypes.shape({
    brick: PropTypes.number.isRequired,
    lumber: PropTypes.number.isRequired,
    wool: PropTypes.number.isRequired,
    grain: PropTypes.number.isRequired,
    ore: PropTypes.number.isRequired
  }),
  Card: PropTypes.oneOf([
    "road_building",
    "year_of_plenty",
    "monopoly",
    "victory_point",
    "knight"
  ]),
  Room: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    owner: PropTypes.string.isRequired,
    max_players: PropTypes.number.isRequired,
    players: PropTypes.arrayOf(PropTypes.string).isRequired
  })
};

CatanTypes.HexPosition = CatanTypes.VertexPosition;

export default CatanTypes;
