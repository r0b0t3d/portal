import * as React from 'react';
import { addPortalAtom, updatePortalAtom, removePortalAtom } from './Host';
import { useSetAtom } from 'jotai';

interface IPortalProps {
  children: React.ReactNode;
}

let portalKey = 0;
export const Portal = ({ children }: IPortalProps) => {
  const key = React.useRef(0);
  const addPortal = useSetAtom(addPortalAtom);
  const updatePortal = useSetAtom(updatePortalAtom);
  const removePortal = useSetAtom(removePortalAtom);

  React.useEffect(() => {
    key.current = portalKey++;
    addPortal({ key: key.current.toString(), children });
    return () => {
      removePortal(key.current.toString());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  React.useEffect(() => {
    if (key.current === 0) {
      return;
    }
    updatePortal({ key: key.current.toString(), children });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [children]);

  return null;
};
