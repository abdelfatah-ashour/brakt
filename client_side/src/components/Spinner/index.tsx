import "./spinner.css";

export default function Spinner(): JSX.Element {
  return (
    <div className="spinner w-100 d-flex justify-content-center align-items-center">
      <div className="sp sp-3balls"></div>
    </div>
  );
}
