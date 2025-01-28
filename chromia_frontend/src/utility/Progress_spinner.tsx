import { ImSpinner9 } from "react-icons/im";

interface spinrerProps{
  message: string;  // Your custom message here.
}
const Spinner: React.FC<spinrerProps> = ({ message }) => {
  return (
    <div className="flex items-center justify-center h-96 z-50">
      <ImSpinner9 className="animate-spin text-blue-500" />
      <p className="text-sm text-center">{message}</p>
    </div>
  );
}

export default Spinner;
