import { ListsProvider } from './ListsContext.tsx';
import { JSX } from 'react';

type Props = {
  children: JSX.Element | JSX.Element[];
};
const AuthorizedContextsContainer = ({ children }: Props) => {
  return <ListsProvider>{children}</ListsProvider>;
};

export default AuthorizedContextsContainer;
