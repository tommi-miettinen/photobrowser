import { useState, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import type { ThumbnailProps } from "../../types/types";
import { Link } from "react-router-dom";
import styled from "styled-components";

const StyledImg = styled.img`
  margin: 4px;
  box-shadow: 0 1px 1px 1px #ddd;

  &: hover {
    box-shadow: 0px 0px 5px 5px #ddd;
  }
`;

const Thumbnail = ({ image, isLast, fetchMore }: ThumbnailProps) => {
  const [isDelayed, setIsDelayed] = useState(false);
  const [ref, inView] = useInView();

  // Adding delay so fetchMore doesnt trigger before thumbnails are rendered.
  useEffect(() => {
    if (isLast)
      setTimeout(() => {
        setIsDelayed(true);
      }, 100);
  }, []);

  useEffect(() => {
    if (inView && isLast && isDelayed) {
      fetchMore(image.albumId + 1);
    }
  }, [inView]);

  return (
    <Link to={`/image/${image.id}`}>
      <StyledImg ref={ref} src={image.thumbnailUrl} />
    </Link>
  );
};

export default Thumbnail;
