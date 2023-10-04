type Props = {
  type: string;
  placeholder: string;
  name: string;
  handleChange: any;
  handleBlur: any;
  value: string;
  error: string | undefined;
  touched: boolean | undefined;
  isUsernameAvailable?: boolean;
};

const TextField = ({
  type,
  placeholder,
  name,
  handleChange,
  handleBlur,
  value,
  error,
  touched,
  isUsernameAvailable,
}: Props) => {
  return (
    <div className="flex flex-col-reverse gap-1 w-full">
      {name === "username" ? (
        <>
          {!error && isUsernameAvailable && value?.length > 5 && (
            <p className="text-[12px] text-green-500">Username is available</p>
          )}
          {!error && !isUsernameAvailable && (
            <p className="text-[12px] text-red-500">
              Username is not available
            </p>
          )}
          {error && touched && (
            <p className="text-[12px] text-red-500">{error}</p>
          )}
        </>
      ) : (
        <>
          {error && touched && (
            <p className="text-[12px] text-red-500">{error}</p>
          )}
        </>
      )}

      <input
        type={type}
        placeholder={placeholder}
        name={name}
        id={name}
        onChange={handleChange}
        onBlur={handleBlur}
        value={value}
        className={`border ${
          error && touched
            ? "border-red-500 focus:border-red-500 border-2"
            : "border-gray-500 focus:border-purple-500 border"
        }   w-full h-[38px] text-sm text-white rounded-[6px] focus:outline-none  focus:ring-0  peer bg-gray-950  pl-4 placeholder:text-gray-200 `}
      />
      <label
        htmlFor={name}
        className="text-[13px] text-gray-300 font-bold peer-focus:text-purple-400 after:content-['*'] after:ml-0.5 after:text-red-500"
      >
        {placeholder}
      </label>
    </div>
  );
};

export default TextField;
