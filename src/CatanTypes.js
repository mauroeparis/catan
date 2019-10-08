import PropTypes from "prop-types";

const CatanTypes = {
  VertexPosition: PropTypes.shape({
    level: PropTypes.number.isRequired,
    index: PropTypes.number.isRequired
  }),
  Resource: PropTypes.oneOf(["brick", "lumber", "wool", "grain", "ore"]),
  Room: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    owner: PropTypes.string.isRequired,
    players: PropTypes.arrayOf(PropTypes.string),
    max_players: PropTypes.number.isRequired
  })
};

CatanTypes.HexPosition = CatanTypes.VertexPosition;

export default CatanTypes;
