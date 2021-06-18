import { store } from "../redux/store/store";

export interface Image {
  id: number;
  albumId: number;
  thumbnailUrl: string;
  title: string;
  url: string;
}

export interface ImagesState {
  images: Image[];
  loaded: boolean;
  error: boolean;
}

export interface ThumbnailProps {
  image: Image;
  isLast: Boolean;
  fetchMore: (albumId: number) => void;
}

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
