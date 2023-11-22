import Calculator from "./components/Calculator";

export default function Home() {
  return (
    <>
      <div className="container-fluid flex justify-center items-center min-h-screen">
        <div className="flex justify-center">
          <Calculator />
        </div>
      </div>
    </>
  );
}
