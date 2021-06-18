import { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import ErrorMessage from "../error-message/error-message";
import axios from "axios";
import styled from "styled-components";

const StyledImageDetails = styled.div`
  box-shadow: 0px 0px 10px lightgrey;
  max-width: 600px;
  margin: auto;
  margin-top: 24px;
  display: flex;
  flex-direction: column;
  background-color: #fff;
  box-shadow: 0 1px 1px 1px #ddd;
  text-align: center;

  h1 {
    text-align: left;
    font-weight: 600;
    padding: 0px 0px 12px 12px;
    font-family: Segoe UI;
  }
  h1:first-letter {
    text-transform: uppercase;
  }
`;

const ImageDetails = ({ match: { url } }: { match: { url: string } }) => {
  const [image, setImage] = useState({ title: "", url: "" });
  const [error, setError] = useState(false);

  useEffect(() => {
    fetchImage();
  }, []);

  const fetchImage = async () => {
    try {
      const imageId = url.split("/").pop();
      const apiUrl = `https://jsonplaceholder.typicode.com/photos/${imageId}`;
      const result = await axios.get(apiUrl);
      setImage(result.data);
      setError(false);
    } catch (err) {
      setError(true);
    }
  };

  if (error) return <ErrorMessage />;

  return (
    <StyledImageDetails>
      <img src={image.url} />
      <h1>{image.title}</h1>
    </StyledImageDetails>
  );
};

export default withRouter(ImageDetails);
