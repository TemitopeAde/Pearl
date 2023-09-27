import { useForm } from "react-hook-form"

const Input = ({
  type,
  className,
  placeholder,
  value,
  onChange,
  name,
  required
}) => {

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()


  return (
    <div>
      <input
        type={type}
        className={className}
        placeholder={placeholder}
        value={value}
        required={required}
        onChange={onChange}
        {...register(`${name}`, { required: true })}
      />
      {/* {` ${errors}.${name}` && <span>field is required</span>} */}
    </div>
  )
}

export default Input