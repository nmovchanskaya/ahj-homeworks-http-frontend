import createRequest from './api/createRequest';

/**
 *  Класс для связи с сервером.
 *  Содержит методы для отправки запросов на сервер и получения ответов
 * */
export default class TicketService {
  list(callback) {
    createRequest({
      sendMethod: 'GET',
      method: 'allTickets',
      callback,
    });
  }

  get(id, callback) {
    createRequest({
      sendMethod: 'GET',
      method: 'ticketById',
      id,
      callback,
    });
  }

  create(data, callback) {
    createRequest({
      sendMethod: 'POST',
      method: 'createTicket',
      data,
      callback,
    });
  }

  update(id, data, callback) {
    createRequest({
      sendMethod: 'POST',
      method: 'updateById',
      id,
      data,
      callback,
    });
  }

  delete(id, callback) {
    createRequest({
      sendMethod: 'GET',
      method: 'deleteById',
      id,
      callback,
    });
  }
}
