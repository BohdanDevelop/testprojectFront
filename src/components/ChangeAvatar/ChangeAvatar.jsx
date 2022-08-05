const ChangeAvatar = ({ onSubmit, name, buttonName }) => {
  return (
    <form encType="multipart/form-data" onSubmit={onSubmit} action="">
      <input name={name} type="file" />
      <button type="submit">{buttonName}</button>
    </form>
  );
};
export default ChangeAvatar;
