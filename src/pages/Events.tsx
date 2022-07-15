import React, { useEffect, useMemo } from 'react';
import { Banner, Button, Group, Panel, PanelHeader, PanelProps, Placeholder } from '@vkontakte/vkui';
import { useGetEventsQuery, useTakePartMutation } from '../generated';
import { Icon56GhostOutline } from '@vkontakte/icons';
import { useAtomState, useSetAtomState } from '@mntm/precoil';
import { isAppLoadingAtom, snackbarAtom, vkUserAtom } from '../store';
import { SnackbarType } from '../types';

export const Events: React.FC<PanelProps> = ({ nav }: PanelProps) => {
  const { data: events, isLoading } = useGetEventsQuery();
  const setIsAppLoading = useSetAtomState(isAppLoadingAtom);
  const [user] = useAtomState(vkUserAtom);
  const { mutateAsync: takePartInRuffle } = useTakePartMutation();
  const setSnackbar = useSetAtomState(snackbarAtom);

  useEffect(() => {
    setIsAppLoading(isLoading);
  }, [isLoading]);

  const eventsNode = useMemo(
    () =>
      !!events?.getVkEvents.length ? (
        events.getVkEvents.map((event) => (
          <Banner
            subheader={event?.description}
            header={event?.name}
            actions={
              <>
                <Button
                  mode="primary"
                  onClick={() => setSnackbar({ type: SnackbarType.DONE, text: 'Вы записаны на мероприятие' })}
                >
                  Записаться
                </Button>
                {!!event?.raffleId && (
                  <Button
                    mode="tertiary"
                    hasHover={false}
                    onClick={() => {
                      takePartInRuffle({ userId: user.id, raffleId: event.raffleId }).finally(() =>
                        setSnackbar({ type: SnackbarType.DONE, text: 'Вы учавствутете в розыгрыше' }),
                      );
                    }}
                  >
                    Розыгрыш!
                  </Button>
                )}
              </>
            }
          />
        ))
      ) : (
        <Placeholder icon={<Icon56GhostOutline />}>Здесь ничего нет!</Placeholder>
      ),
    [events],
  );

  return (
    <Panel nav={nav}>
      <PanelHeader>Мероприятие</PanelHeader>
      <Group>{eventsNode}</Group>
    </Panel>
  );
};
