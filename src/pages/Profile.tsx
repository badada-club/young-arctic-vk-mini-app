import React from 'react';
import { Avatar, Group, Panel, PanelHeader, PanelProps, SimpleCell } from '@vkontakte/vkui';
import type { UserInfo } from '@vkontakte/vk-bridge';
import { useAtomValue } from '@mntm/precoil';
import { vkUserAtom } from '../store';

export const Profile: React.FC<PanelProps> = ({ nav }: PanelProps) => {
  const vkUser: UserInfo = useAtomValue(vkUserAtom);

  return (
    <Panel nav={nav}>
      <PanelHeader>Профиль</PanelHeader>
      <Group>
        <SimpleCell before={<Avatar size={72} src={vkUser.photo_200} />} description="Это же ты!">
          {vkUser.first_name} {vkUser.last_name}
        </SimpleCell>
      </Group>
    </Panel>
  );
};
