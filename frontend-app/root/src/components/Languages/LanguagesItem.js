import React from "react";

export default function LanguagesItem({ language, setRef }) {
  return <li ref={setRef}>{language}</li>;
}
