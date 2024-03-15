"use client";
import { Fragment, useState } from "react";
import axios from "axios";
import Results from "./Results";

export default function FileUploader() {
  const [results, setResults] = useState<any>(null);

  const upload = async (event: any) => {
    event.preventDefault();
    let formData = new FormData();
    formData.append("file", document.getElementById("input").files[0]);
    const res = await axios.post("http://localhost:3000/api/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    const data = await res.data;
    setResults(data.data);
  };

  return (
    <Fragment>
      <form onSubmit={upload} id="form">
        <div className="container px-4 mx-auto">
          <input
            type="file"
            id="input"
            className="rounded-md px-2.5 py-1.5 m-5 text-sm font-semibold"
          />
          <button
            type="submit"
            className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
          >
            Upload file
          </button>
        </div>
      </form>
      <Results results={results} />
    </Fragment>
  );
}
