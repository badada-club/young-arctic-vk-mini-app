import React, { useCallback, useState } from 'react';
import {
  Button,
  DateInput,
  FormItem,
  FormLayout,
  Group,
  Input,
  LocaleProviderContext,
  Panel,
  PanelHeader,
  PanelProps,
  Textarea,
} from '@vkontakte/vkui';
import { EventInput } from '../../graphql/generated';
import { useAtomState, useSetAtomState } from '@mntm/precoil';
import { snackbarAtom, vkUserAtom } from '../store';
import { useCreateEventMutation } from '../generated';
import { SnackbarType } from '../types';

export const AddEvent: React.FC<PanelProps> = ({ nav }: PanelProps) => {
  const [vkUser] = useAtomState(vkUserAtom);
  const [event, setEvent] = useState<EventInput>({
    creatorVkId: String(vkUser.id),
    date: '',
    description: '',
    groupVkId: '',
    name: '',
  });
  const { mutateAsync: createEvent } = useCreateEventMutation();
  const setSnackbar = useSetAtomState(snackbarAtom);

  const handleSubmit = useCallback(async () => {
    try {
      await createEvent({ input: event });
      setSnackbar({ type: SnackbarType.DONE, text: 'Событие создано успешно' });
    } catch (error) {
      setSnackbar({ type: SnackbarType.ERROR, text: 'Ошибка создания события' });
    }
  }, [event]);

  return (
    <Panel nav={nav}>
      <PanelHeader>Создание мероприятия</PanelHeader>
      <Group>
        <FormLayout>
          <FormItem top="Название">
            <Input name="name" value={event?.name} onChange={(e) => setEvent({ ...event, name: e.target.value })} />
          </FormItem>

          <FormItem top="Дата и время">
            <LocaleProviderContext.Provider value="ru">
              <DateInput
                value={event.date ? new Date(event.date) : undefined}
                onChange={(date) => setEvent({ ...event, date: date?.getTime() })}
                disablePast={true}
                closeOnChange={true}
                enableTime={true}
                showNeighboringMonth={true}
              />
            </LocaleProviderContext.Provider>
          </FormItem>

          <FormItem top="Описание">
            <Textarea
              name="description"
              value={event?.description || ''}
              onChange={(e) => setEvent({ ...event, description: e.target.value })}
            />
          </FormItem>

          <FormItem>
            <Button size="l" stretched onClick={handleSubmit}>
              Создать
            </Button>
          </FormItem>
        </FormLayout>
      </Group>
    </Panel>
  );
};
