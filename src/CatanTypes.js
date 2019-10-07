import PropTypes from "prop-types";

const CatanTypes = {
  VertexPosition: PropTypes.shape({
    level: PropTypes.number.isRequired,
    index: PropTypes.number.isRequired
  }),
  Resource: PropTypes.oneOf(["brick", "lumber", "wool", "grain", "ore"])
};
CatanTypes.HexPosition = CatanTypes.VertexPosition;

export default CatanTypes;
