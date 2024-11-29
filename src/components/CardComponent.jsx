import PropTypes from "prop-types";

const CardComponent = ({ title, value, description, text, element }) => {
  return (
    <div className="bg-white p-6 border border-gray-200 rounded-lg shadow-lg">
      <h2 className="text-xl font-bold text-gray-700">{title}</h2>
      <p className="text-2xl font-extrabold text-green-600 my-2">{value}</p>
      <p className="text-sm text-gray-500">{description}</p>
      {element?.length > 0 && (
        <p className="text-sm text-gray-500">
          {text} -
          {element?.map((_item, i) => (
            <span className="text-sm text-red-500" key={i}>
              item
            </span>
          ))}
        </p>
      )}
    </div>
  );
};

// Prop validation using PropTypes
CardComponent.propTypes = {
  title: PropTypes.string.isRequired, // Title must be a string and is required
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired, // Value must be a string or number
  description: PropTypes.string, // Description is optional, but must be a string if provided
  text: PropTypes.string, // Text is optional, but must be a string if provided
  element: PropTypes.arrayOf(PropTypes.string), // Element must be an array of strings
};

export default CardComponent;
