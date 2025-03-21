import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { atom, Provider, useAtomValue } from 'jotai';

const portalsAtom = atom<{ key: string; children: React.ReactNode }[]>([]);
export const addPortalAtom = atom(
  null,
  (get, set, value: { key: string; children: React.ReactNode }) => {
    const portals = get(portalsAtom);
    set(portalsAtom, [...portals, value]);
  }
);

export const updatePortalAtom = atom(
  null,
  (get, set, value: { key: string; children: React.ReactNode }) => {
    const portals = get(portalsAtom);
    set(
      portalsAtom,
      portals.map((p) => (p.key === value.key ? value : p))
    );
  }
);

export const removePortalAtom = atom(null, (get, set, key: string) => {
  const portals = get(portalsAtom);
  set(
    portalsAtom,
    portals.filter((portal) => portal.key !== key)
  );
});

export const Host = () => {
  const portals = useAtomValue(portalsAtom);

  return (
    <Provider>
      {portals.map(({ key, children }, index: number) => (
        <View
          key={`portal-${key}-${index}`}
          collapsable={false}
          pointerEvents="box-none"
          style={StyleSheet.absoluteFill}
        >
          {children}
        </View>
      ))}
    </Provider>
  );
};
