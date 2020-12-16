import React, { FormEvent, useEffect, useState } from 'react';
import Select, { ValueType } from 'react-select';
import { FiArrowRight } from 'react-icons/fi';
import Swal from 'sweetalert2';

import { Container, Content, Dividas, Section, Form, Footer } from './styles';
import api from '../../services/api';

interface OptionType {
  value: string;
  label: string;
}

interface IUsers extends OptionType {
  value: string;
  label: string;
}

interface IBill {
  id: number;
  id_user: string | undefined;
  name_user: string | undefined;
  motivo: string;
  data: string;
  valor: string;
}

const Bills: React.FC = () => {
  const [bills, setBills] = useState<IBill[]>([]);
  const [users, setUsers] = useState<IUsers[]>([]);

  const [idBill, setIdBill] = useState(0);
  const [motivo, setMotivo] = useState('');
  const [valor, setValor] = useState('');
  const [data, setData] = useState('');

  const [selectedOption, setSelectedOption] = useState<
    ValueType<OptionType, false>
  >();

  useEffect(() => {
    async function loadUsers(): Promise<void> {
      const listUsers = await api.get(
        'https://jsonplaceholder.typicode.com/users',
      );

      const options = listUsers.data.map((result: { id: any; name: any }) => ({
        value: result.id,
        label: result.name,
      }));

      setUsers(options);
    }
    loadUsers();
  }, []);

  useEffect(() => {
    async function loadBills(): Promise<void> {
      const listBills = await api.get('/bill');

      setBills(listBills.data);
    }
    loadBills();
  }, []);

  const handleChange = (option: ValueType<OptionType, false>) => {
    setSelectedOption(option);
  };

  const handleChargeValues = (dataBill: IBill) => {
    setIdBill(dataBill.id);
    setMotivo(dataBill.motivo);
    setValor(dataBill.valor);
    setData(dataBill.data);
    if (dataBill.id_user && dataBill.name_user) {
      setSelectedOption({ value: dataBill.id_user, label: dataBill.name_user });
    }
  };

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    if (
      selectedOption?.value !== '' &&
      selectedOption?.label !== '' &&
      motivo !== '' &&
      valor !== '' &&
      data !== ''
    ) {
      try {
        const newBill: IBill = {
          id: bills[bills.length - 1] ? bills[bills.length - 1].id + 1 : 1,
          id_user: selectedOption?.value,
          name_user: selectedOption?.label,
          motivo,
          valor,
          data,
        };

        await api.post('/bill', newBill);
        setBills([...bills, newBill]);

        Swal.fire({
          title: 'Sucesso!',
          text: 'Cadastro realizado com sucesso',
          icon: 'success',
          confirmButtonText: 'Ok',
        });

        setMotivo('');
        setValor('');
        setData('');
        setSelectedOption({ value: '', label: '' });
      } catch (err) {
        console.log(err);
      }
    } else {
      Swal.fire({
        title: 'Erro!',
        text: 'Todos os campos devem estar preenchidos',
        icon: 'error',
        confirmButtonText: 'Ok',
      });
    }
  }

  async function handleUpdateBill(id: number): Promise<void> {
    if (id !== 0) {
      try {
        const updateBill = bills.map(currentBill => {
          if (currentBill.id !== id) {
            return currentBill;
          }
          return {
            id,
            id_user: selectedOption?.value,
            name_user: selectedOption?.label,
            motivo,
            valor,
            data,
          };
        });

        setBills(updateBill);

        await api.put(`/bill/${id}`, {
          id,
          id_user: selectedOption?.value,
          name_user: selectedOption?.label,
          motivo,
          valor,
          data,
        });

        Swal.fire({
          title: 'Sucesso!',
          text: 'Cadastro atualizado com sucesso',
          icon: 'success',
          confirmButtonText: 'Ok',
        });

        setMotivo('');
        setValor('');
        setData('');
        setSelectedOption({ value: '', label: '' });
      } catch (err) {
        console.log(err);
      }
    } else {
      Swal.fire({
        title: 'Erro!',
        text:
          'Favor selecionar uma divida na lista ao lado, antes de executar essa ação',
        icon: 'error',
        confirmButtonText: 'Ok',
      });
    }
  }

  async function handleDeleteBill(id: number): Promise<void> {
    if (id !== 0) {
      try {
        await api.delete(`/bill/${id}`);
        const deletedBill = bills.filter(listbill => listbill.id !== id);
        setBills(deletedBill);

        Swal.fire({
          title: 'Sucesso!',
          text: 'Cadastro excluido com sucesso',
          icon: 'success',
          confirmButtonText: 'Ok',
        });

        setMotivo('');
        setValor('');
        setData('');
        setSelectedOption({ value: '', label: '' });
      } catch (err) {
        console.log(err);
      }
    } else {
      Swal.fire({
        title: 'Erro!',
        text:
          'Favor selecionar uma divida na lista ao lado, antes de executar essa ação',
        icon: 'error',
        confirmButtonText: 'Ok',
      });
    }
  }

  return (
    <Container>
      <Content className="d-flex flex-wrap">
        <Section>
          {bills &&
            bills.map(bill => (
              <Dividas key={bill.id}>
                <div>
                  <strong>{bill.name_user}</strong>
                  <span>{bill.valor}</span>
                  <button
                    type="button"
                    onClick={() => {
                      handleChargeValues(bill);
                    }}
                  >
                    <FiArrowRight size={18} />
                  </button>
                </div>
              </Dividas>
            ))}
        </Section>

        <Form onSubmit={handleSubmit}>
          <div className="div-form">
            <fieldset>
              <div className="input-block form-group">
                <label htmlFor="user">Cliente</label>
                <Select
                  value={selectedOption as ValueType<OptionType, false>}
                  onChange={option => handleChange(option)}
                  options={users}
                  className="select"
                  key={selectedOption?.value}
                  data-testid="selectOption"
                />
              </div>

              <div className="input-block form-group">
                <label htmlFor="motivo">Motivo</label>
                <input
                  id="motivo"
                  value={motivo}
                  onChange={event => setMotivo(event.target.value)}
                  placeholder="Ex: Divida do cartão"
                  className="form-control"
                />
              </div>

              <div className="input-block form-group">
                <label htmlFor="valor">Valor</label>
                <input
                  id="valor"
                  maxLength={300}
                  value={valor}
                  onChange={event => setValor(event.target.value)}
                  placeholder="Ex: R$ 500,00"
                  className="form-control"
                />
              </div>

              <div className="input-block form-group">
                <label htmlFor="data">Data</label>
                <input
                  id="data"
                  maxLength={300}
                  value={data}
                  onChange={event => setData(event.target.value)}
                  placeholder="Ex: 11/12/2020"
                  className="form-control"
                />
              </div>
            </fieldset>
            <Footer>
              <button
                className="excluir-button form-group"
                type="button"
                onClick={() => handleDeleteBill(idBill)}
              >
                Excluir
              </button>
              <button
                className="salvar-button form-group"
                type="button"
                onClick={() => handleUpdateBill(idBill)}
              >
                Salvar
              </button>
            </Footer>
          </div>

          <button
            data-testid="add-bill-button"
            className="novo-button form-group"
            type="submit"
          >
            Novo
          </button>
        </Form>
      </Content>
    </Container>
  );
};
export default Bills;
