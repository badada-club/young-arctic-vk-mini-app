import React, { ReactNode } from 'react';
import { PanelHeader, ScreenSpinner, SplitCol, SplitLayout, useAdaptivity, ViewWidth } from '@vkontakte/vkui';
import { NavigationMenu } from './NavigationMenu';
import {
  Icon28LocationMapOutline,
  Icon28DonateOutline,
  Icon28MessageOutline,
  Icon28UserCircleOutline,
  Icon28ListOutline,
  Icon28AddOutline,
} from '@vkontakte/icons';

import { NavigationTabbar } from './NavigationTabbar';
import { Modals } from '../../modals';
import { NavigationItem } from '../../types';
import { CustomSnackbar } from '../snackbar/CustomSnackbar';
import { Structure, Epic } from '@cteamdev/router';
import { Popouts } from '../../popouts';
import { useAtomState } from '@mntm/precoil';
import { isAppLoadingAtom } from '../../store';

const items: NavigationItem[] = [
  { to: '/map', text: 'Карта', icon: <Icon28LocationMapOutline /> },
  { to: '/grants', text: 'Гранты', icon: <Icon28DonateOutline /> },
  { to: '/work', text: 'Вакансии', icon: <Icon28MessageOutline /> },
  { to: '/profile', text: 'Профиль', icon: <Icon28UserCircleOutline /> },
  { to: '/', text: 'Эвенты', icon: <Icon28ListOutline /> },
  { to: '/addEvent', text: 'Добавить', icon: <Icon28AddOutline /> },
];

type NavigationProps = {
  children: ReactNode;
};

export const Navigation: React.FC<NavigationProps> = ({ children }: NavigationProps) => {
  const { viewWidth } = useAdaptivity();
  const isDesktop: boolean = (viewWidth ?? 0) >= ViewWidth.SMALL_TABLET;
  const [isAppLoading] = useAtomState(isAppLoadingAtom);

  return (
    <Structure>
      <SplitLayout
        header={!isDesktop && <PanelHeader separator={false} />}
        style={{ justifyContent: 'center' }}
        modal={<Modals />}
        popout={isAppLoading ? <ScreenSpinner /> : <Popouts />}
      >
        <SplitCol animate={!isDesktop} width={isDesktop ? '550px' : '100%'} maxWidth={isDesktop ? '550px' : '100%'}>
          <Epic tabbar={!isDesktop && <NavigationTabbar items={items} />}>{children}</Epic>
          <CustomSnackbar isDesktop={isDesktop} />
        </SplitCol>
        {isDesktop && <NavigationMenu items={items} />}
      </SplitLayout>
    </Structure>
  );
};
