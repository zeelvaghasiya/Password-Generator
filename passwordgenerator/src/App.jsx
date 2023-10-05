import React, { useCallback, useEffect, useRef, useState } from "react";

const PasswordGenerator = () => {
  const [length, setLength] = useState("8");
  const [allowCharactor, setAllowCharactor] = useState(false);
  const [allowNumber, setAllowNumber] = useState(false);
  const [password, setPassword] = useState("");

  const passwordRef = useRef(null);

  const generatePassword = useCallback(() => {
    let pass = "";
    let str = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

    if (allowCharactor) str += `!@#$%^&*()_+[]{}|;:,.<>?"`;

    if (allowNumber) str += `0123456789`;

    for (let i = 1; i <= length; i++) {
      const index = Math.floor(Math.random() * str.length);

      pass += str[index];
    }

    setPassword(pass);
  }, [length, allowCharactor, allowNumber, setPassword]);

  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0,50);
    window.navigator.clipboard.writeText(password);
  }, [setPassword]);

  useEffect(() => {
    generatePassword();
  }, [length, allowCharactor, allowNumber]);

  return (
    <>
      <h1 className="text-3xl text-orange-400 font-semibold text-center mt-28 mb-10">
        Password Generator
      </h1>
      <div className="max-w-md w-full bg-gray-700 mx-auto p-4 rounded-lg shadow-sm shadow-gray-600 sm:max-w-lg md:max-w-xl">
        <div className="mb-4">
          <div className="mt-4 mb-4">
            <input
              type="text"
              className="font-bold w-full rounded-sm p-1 text-orange-800 shadow-md shadow-gray-800"
              readOnly
              value={password}
              ref={passwordRef}
            />
          </div>
          <div className="flex">
            <input
              type="range"
              value={length}
              onChange={(e) => setLength(e.target.value)}
              min="1"
              max="50"
              id="passwordRange"
              className="w-1/3 mr-4"
            />
            <p className="text-sm text-orange-400">Password Length: {length}</p>
          </div>
        </div>
        <div className="mb-2">
          <input
            type="checkbox"
            defaultChecked={allowCharactor}
            onClick={() => setAllowCharactor((prev) => !prev)}
            className="mr-2"
          />
          <label className="text-sm text-orange-400">Allow Characters</label>
        </div>
        <div className="mb-2">
          <input
            type="checkbox"
            defaultChecked={allowNumber}
            onClick={() => setAllowNumber((prev) => !prev)}
            className="mr-2"
          />
          <label className="text-sm text-orange-400">Allow Numbers</label>
        </div>
        <button
          onClick={copyPasswordToClipboard}
          className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md w-full sm:w-auto"
        >
          Copy Password
        </button>
      </div>
      <h1 className="text-sm text-orange-400 font-semibold text-center mt-6">
        Created By : Zeel.D.V
      </h1>
    </>
  );
};

export default PasswordGenerator;
