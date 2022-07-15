import React from 'react';
import { Alert } from '@vkontakte/vkui';
import { PopoutProps } from '../types';
import { push } from '@cteamdev/router';

export const TestAlert: React.FC<PopoutProps> = () => {
  return (
    <Alert
      actions={[
        {
          title: 'Круто!',
          mode: 'destructive',
          autoclose: true,
        },
        {
          title: 'Отмена',
          mode: 'cancel',
          autoclose: true,
        },
      ]}
      onClose={() => push('/')}
      header="Вы участвуете в розыгрыше"
      text="Ваш ID участника 150"
      actionsLayout="vertical"
    />
  );
};
