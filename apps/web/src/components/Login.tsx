export default function Login() {
  return (
    <>
      <div className="flex min-h-screen justify-center items-center">
        <div className="flex flex-col justify-center items-center h-96 w-96">
          <div className="flex flex-col p-40 space-y-10 justify-center rounded-lg items-center w-full bg-black h-36">
            <input
              placeholder="Email"
              className="border-black rounded-lg p-2"
            />
            <input
              placeholder="Password"
              className="border-black rounded-lg p-2"
            />
          </div>
        </div>
      </div>
    </>
  );
}
