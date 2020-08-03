import { createGlobalStyle } from "styled-components";
const GlobalStyles = createGlobalStyle`

@import url('https://fonts.googleapis.com/css2?family=Lato:wght@400;700&family=Montserrat+Alternates:wght@600;700&family=Montserrat:wght@300;400;700&family=Raleway:wght@400;600;700&display=swap');

  * {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'Montserrat', sans-serif;
    font-size: 16px;
    color: #333333;
  }

  .App {
    padding: 10px;
  }

  h1, h2, h3, h4, h5, h6{
    font-family: 'Raleway', sans-serif;
    font-weight: 700;
  }

  button, a {
    font-family: 'Lato', sans-serif;
    font-size: 18px;
    letter-spacing: .6px;
    text-decoration: none;
    color: inherit;
  }

  ul {
    list-style: none;
  }

  button, input, textarea {
    border: 1px solid #555555;
    display: block;
    padding: 5px 10px;
    background-color: transparent;
    text-decoration: none;
    outline: none;
    resize: none;
    cursor: pointer;

    &:disabled {
      background-color: transparent;
      color: #bbbbbb;
      border-color: #cccccc
    }
  }

  ::-webkit-scrollbar {
  width: 10px;
}

/* Track */
::-webkit-scrollbar-track {
  background: #f1f1f1;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: #888;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #555;
}

`;

export default GlobalStyles;
