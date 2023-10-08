import React, { useState } from "react";

interface WelcomePageProps{
  setUserName:(name: string)=>void,
  setWelcomePage:(isWelcomePage: boolean)=>void
}
const WelcomePage: React.FC<WelcomePageProps> = ({setUserName, setWelcomePage}) => {
  const [name,setName] = useState("")
  const [isNameSubmitted, setIsNameSubmitted] = useState<boolean>(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value)
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setUserName(name)
    setWelcomePage(false)
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-5xl font-bold text-gray-900 mb-4">
        Welcome to Our App!
      </h1>
      {!isNameSubmitted ? (
        <form
          onSubmit={handleSubmit}
          className="bg-white p-8 rounded shadow-md w-1/3 mb-10"
        >
          <label
            htmlFor="name"
            className="block text-lg font-medium text-gray-600 mb-4"
          >
            Please enter your name:
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={name}
            onChange={handleInputChange}
            className="p-4 border rounded w-full mb-6"
          />
          <div className="text-right">
            <button
              type="submit"
              className="bg-blue-500 text-white px-6 py-3 rounded hover:bg-blue-600"
            >
              Submit
            </button>
          </div>
        </form>
      ) : (
        <p className="bg-white p-8 rounded shadow-md w-1/3 text-center text-lg text-gray-700">
          Thank you, {name}! Your name has been submitted.
        </p>
      )}
    </div>
  );
};

export default WelcomePage;
