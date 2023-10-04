import { ButtonLoader } from "..";

type Props = {
  type: "button" | "submit" | "reset" | undefined;
  isLoading?: boolean;
  label: string;
  disable?: boolean;
};

const DefaultButton = ({ type, isLoading, label, disable }: Props) => {
  return (
    <button
      type={type}
      className="bg-purple-600 rounded-lg w-full py-2.5 mt-3 text-white text-base font-semibold"
      disabled={disable ? isLoading || disable : isLoading}
    >
      {isLoading ? <ButtonLoader /> : label}
    </button>
  );
};

export default DefaultButton;
