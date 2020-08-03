import React from "react";

export default function LanguagesItem({ language, setRef, isCurrent }) {
  return (
    <li
      style={{ fontWeight: isCurrent ? 700 : 400, cursor: "pointer" }}
      ref={setRef}
    >
      {language}
    </li>
  );
}
