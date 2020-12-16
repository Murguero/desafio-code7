import React from 'react';

import { render, waitFor } from '@testing-library/react';
import AxiosMock from 'axios-mock-adapter';
import api from '../../services/api';

import Bills from '../../pages/Bills';

const apiMock = new AxiosMock(api);

describe('Bills', () => {
  it('should be able to list all the bills from your api', async () => {
    apiMock.onGet('https://jsonplaceholder.typicode.com/users').reply(200, [
      { value: 7, label: 'Kurtis Weissnat' },
      { value: 9, label: 'Glenna Reichert' },
    ]);
    apiMock.onGet('/bill').reply(200, [
      {
        id: 1,
        id_user: 7,
        name_user: 'Kurtis Weissnat',
        motivo: 'Divida cartão de credito',
        valor: 'R$500,00',
        data: '11/12/2020',
      },
      {
        id: 2,
        id_user: 9,
        name_user: 'Glenna Reichert',
        motivo: 'Gasolina',
        valor: 'R$80,00',
        data: '13/12/2020',
      },
    ]);

    const { getByText } = render(<Bills />);

    await waitFor(() => expect(getByText('Kurtis Weissnat')).toBeTruthy(), {
      timeout: 200,
    });

    expect(getByText('Kurtis Weissnat')).toBeTruthy();
    expect(getByText('R$500,00')).toBeTruthy();

    expect(getByText('Glenna Reichert')).toBeTruthy();
    expect(getByText('R$80,00')).toBeTruthy();
  });
});
/*
Considerações:
Devido ao pouco tempo para o desafio consegui apenas concluir um dos testes unitarios, ainda falta
realizar os testes unitarios para a edição, exclusão e adição de devidas.
*/
