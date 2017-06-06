const usersTable = document.getElementById('users-table');
const nameInput = $('#name');
const emailInput = $('#email');
const idInput = $('#id');

const Users = {
  all: () => {
    return http.get(endpoints.users);
  },
  get: (id) => {
    return http.get(`${endpoints.users}/${id}`);
  },
  create: (data) => {
    return http.post(endpoints.users, data);
  },
  update: (id, data) => {
    return http.put(`${endpoints.users}/${id}`, data);
  },
  remove: (id) => {
    return http.delete(`${endpoints.users}/${id}`);
  }
};

const updateUsersTable = () => {
  Users.all()
    .then((users) => users.data)
    .then((users) => {
      let table = '';

      users.forEach((user) => {
        table += `<tr>`;
        table += `<td>${user.id}</td>`;
        table += `<td>${user.name}</td>`;
        table += `<td>${user.email}</td>`;
        table += `<td class="has-text-centered edit" data-id="${user.id}"><span class="icon"><i class="fa fa-edit"></i></span></td>`;
        table += `<td class="has-text-centered remove" data-id="${user.id}"><span class="icon"><i class="fa fa-trash-o"></i></span></td>`;
        table += `</tr>`;
      });
      usersTable.innerHTML = table;
    })
    .catch((err) => console.log);
};

const resetForm = () => {
  idInput.val('');
  nameInput.val('');
  emailInput.val('');

  updateUsersTable();

  $('html').removeClass('is-clipped');
  $('#modal-ter').removeClass('is-active');
};

const createOrUpdateUser = () => {
  const id = idInput.val();

  const data = {
    name: nameInput.val(),
    email: emailInput.val()
  };

  if (id) {
    return Users.update(id, data)
      .then((user) => successMessage('Usuário atualizado com sucesso'))
      .then((user) => resetForm())
      .catch((err) => dangerMessage(err));
  }

  return Users.create(data)
    .then((user) => successMessage('Usuário criado com sucesso'))
    .then((user) => resetForm())
    .catch((err) => dangerMessage(err));
};

const removeUser = (id) => {
  Users.remove(id)
    .then((user) => successMessage('Removido com sucesso'))
    .then((user) => updateUsersTable())
    .catch((err) => dangerMessage(err));
};

$(document).ready(() => {
  updateUsersTable();
  $('.create-user').on('click', function (e) {
    e.preventDefault();
    createOrUpdateUser();
    return false;
  });

  $(document).on('click', '.remove', function (e) {
    e.preventDefault();
    const id = $(this).data('id');
    removeUser(id);
    return false;
  });

  $(document).on('click', '.edit', function (e) {
    const id = $(this).data('id');
    const target = $('.modal-button').data('target');

    Users.get(id)
      .then((user) => user.data)
      .then((user) => {
        idInput.val(user.id);
        nameInput.val(user.name);
        emailInput.val(user.email);

        $('html').addClass('is-clipped');
        $(target).addClass('is-active');
      })
      .catch((err) => console.log(err));

    return false;
  });
});
