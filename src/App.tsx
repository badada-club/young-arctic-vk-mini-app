import React, { useEffect } from 'react';
import { AdaptivityProvider, AppRoot, ConfigProvider, PlatformType } from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';
import { View } from '@cteamdev/router';
import { Events, AddEvent, Dev, Profile } from './pages';
import { Navigation } from './components/navigation';
import { getPlatform } from './utils';
import { useSetAtomState } from '@mntm/precoil';
import { vkUserAtom } from './store';
import bridge, { UserInfo } from '@vkontakte/vk-bridge';
import { QueryClient, QueryClientProvider } from 'react-query';
import { TakePart } from './pages/TakePart';

const queryClient = new QueryClient();

export const App: React.FC = () => {
  const platform: PlatformType = getPlatform();
  const setVkUser = useSetAtomState(vkUserAtom);

  useEffect(() => {
    const load = async () => {
      const vkUser: UserInfo = await bridge.send('VKWebAppGetUserInfo');
      setVkUser(vkUser);
    };

    load();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <ConfigProvider platform={platform}>
        <AdaptivityProvider>
          <AppRoot>
            <Navigation>
              <View nav="/">
                <Events nav="/" />
              </View>
              <View nav="/takePart">
                <TakePart nav="/" />
              </View>
              <View nav="/addEvent">
                <AddEvent nav="/" />
              </View>
              <View nav="/map">
                <Dev nav="/" />
              </View>
              <View nav="/grants">
                <Dev nav="/" />
              </View>
              <View nav="/grants">
                <Dev nav="/" />
              </View>
              <View nav="/work">
                <Dev nav="/" />
              </View>
              <View nav="/news">
                <Dev nav="/" />
              </View>
              <View nav="/profile">
                <Profile nav="/" />
              </View>
            </Navigation>
          </AppRoot>
        </AdaptivityProvider>
      </ConfigProvider>
    </QueryClientProvider>
  );
};
