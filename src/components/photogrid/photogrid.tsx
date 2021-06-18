import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchImages, setLoaded } from "../../redux/slices/images-slice";
import type { RootState } from "../../types/types";
import Thumbnail from "../thumbnail/thumbnail";
import ErrorMessage from "../error-message/error-message";
import styled from "styled-components";

const StyledPhotoGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  max-width: 800px;
  padding: 12px;
  margin: auto;
`;

const PhotoGrid = () => {
  const images = useSelector((state: RootState) => state.images.images);
  const loaded = useSelector((state: RootState) => state.images.loaded);
  const error = useSelector((state: RootState) => state.images.error);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!loaded) {
      dispatch(fetchImages(1));
      dispatch(setLoaded());
    }
  }, [dispatch]);

  const fetchMore = (albumId: number) => {
    dispatch(fetchImages(albumId));
  };

  if (error) return <ErrorMessage />;

  return (
    <StyledPhotoGrid>
      {images.map((image, index) => (
        <Thumbnail
          fetchMore={fetchMore}
          isLast={images.length === index + 1}
          key={image.id}
          image={image}
        />
      ))}
    </StyledPhotoGrid>
  );
};

export default PhotoGrid;
