import editImage from '../../images/editButton.png';

const EditButton = ({ onClick }) => {
  return (
    <button onClick={onClick} type="button">
      <img width="15" src={editImage} alt="edit" />
    </button>
  );
};
export default EditButton;
