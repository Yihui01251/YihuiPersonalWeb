

const Input = ({id,value,onChangHandler}) => {
   
  return (
    <>
        <label htmlFor={id}/>{id}
      <input type="text" id={id} value={value} onChange={onChangHandler}/>
    </>
  );
};

export default Input;
