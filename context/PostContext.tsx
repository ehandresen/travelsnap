import { PostType } from '@/types/postType';
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from 'react';
import * as postApi from '@/api/postApi';

// TODO set loading and error states

type PostContextType = {
  posts: PostType[];
  setPosts: Dispatch<SetStateAction<PostType[]>>;
  refreshing: boolean;
  fetchPosts: () => Promise<void>;
};

const PostContext = createContext<PostContextType | undefined>(undefined);

export function usePostContext() {
  const value = useContext(PostContext);

  if (!value) {
    throw new Error(
      'usePostContext must be used within a PostContext Provider'
    );
  }

  return value;
}

const PostProvider = ({ children }: { children: ReactNode }) => {
  const [posts, setPosts] = useState<PostType[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchFromBackend();
  }, []);

  const fetchFromBackend = async () => {
    try {
      setRefreshing(true);
      const response = await postApi.getAllPosts();

      if (response) {
        setPosts(response);
        setRefreshing(false);
      }

      setRefreshing(false);
    } catch (e) {
      console.log('failed fetching posts', e);
    }
  };

  return (
    <PostContext.Provider
      value={{ posts, setPosts, refreshing, fetchPosts: fetchFromBackend }}
    >
      {children}
    </PostContext.Provider>
  );
};

export { PostContext, PostProvider };
