import * as React from 'react';

import { addUpdatePortalAtom, removePortalAtom } from './Host';
import { useAtom } from 'jotai';

interface IPortalProps {
  children: React.ReactNode;
}

let portalKey = 0;
export const Portal = ({ children }: IPortalProps) => {
  const key = React.useRef(portalKey++);
  const [, addUpdatePortal] = useAtom(addUpdatePortalAtom);
  const [, removePortal] = useAtom(removePortalAtom);

  React.useEffect(() => {
    addUpdatePortal({ key: key.current.toString(), children });
    return () => {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      removePortal(key.current.toString());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [children]);

  return null;
};
