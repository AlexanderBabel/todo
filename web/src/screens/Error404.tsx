import React from "react";
import Button from "../components/Button";
import { Link } from "react-router-dom";

function Error404() {
  return (
    <div className="flex justify-center items-center min-h-screen min-w-screen text-center">
      <div>
        <p className="text-5xl font-medium pb-4">
          Fehler 404: Datei nicht gefunden
        </p>
        <Link to="/">
          <Button>Zurück</Button>
        </Link>
      </div>
    </div>
  );
}

export default Error404;
