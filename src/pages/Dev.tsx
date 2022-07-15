import React from 'react';
import { Group, Panel, PanelHeader, PanelProps, Placeholder } from '@vkontakte/vkui';
import { Icon56SettingsOutline } from '@vkontakte/icons';

export const Dev: React.FC<PanelProps> = ({ nav }: PanelProps) => {
  return (
    <Panel nav={nav}>
      <PanelHeader>В разработке</PanelHeader>
      <Group>
        <Placeholder icon={<Icon56SettingsOutline />}>
          Страница находится в разработке, возвращайтесь позже!
        </Placeholder>
      </Group>
    </Panel>
  );
};
