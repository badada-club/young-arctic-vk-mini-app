import React, { useEffect } from 'react';
import { Group, Panel, PanelHeader, PanelProps, Placeholder } from '@vkontakte/vkui';
import { Icon56GhostOutline } from '@vkontakte/icons';
import { useSetAtomState } from '@mntm/precoil';
import { isAppLoadingAtom } from '../store';
import { push } from '@cteamdev/router';

export const TakePart: React.FC<PanelProps> = ({ nav }: PanelProps) => {
  const setIsAppLoading = useSetAtomState(isAppLoadingAtom);

  useEffect(() => {
    setIsAppLoading(true);
    const timer = setTimeout(() => {
      push('/?popout=alert');
      setIsAppLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Panel nav={nav}>
      <PanelHeader>Инфо</PanelHeader>
      <Group>
        <Placeholder icon={<Icon56GhostOutline />}>Здесь ничего нет!</Placeholder>
      </Group>
    </Panel>
  );
};
