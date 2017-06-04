const usersTable = document.getElementById('users-table');
const nameInput = $('#name');
const emailInput = $('#email');

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
                table += `<td class="has-text-centered"><span class="icon"><i class="fa fa-edit"></i></span></td>`;
                table += `<td class="has-text-centered remove" data-id="${user.id}"><span class="icon"><i class="fa fa-trash-o"></i></span></td>`;
                table += `</tr>`;
            });
            usersTable.innerHTML = table;
        })
        .catch((err) => console.log);
};

const resetForm = () => {
    nameInput.val('');
    emailInput.val('');

    updateUsersTable();

    $('html').removeClass('is-clipped');
    $('#modal-ter').removeClass('is-active');
};

const createUser = () => {
    const data = {
        name: nameInput.val(),
        email: emailInput.val()
    };

    Users.create(data)
        .then((user) => console.log())
        .then((user) => resetForm(nameInput, emailInput))
        .catch((err) => console.log());
};

const removeUser = (id) => {
    Users.remove(id)
        .then((user) => updateUsersTable())
        .catch((err) => console.log(err));
};

$(document).ready(() => {
    updateUsersTable();

    $('#create-user').on('click', function (e) {
        e.preventDefault();
        createUser();
        return false;
    });

    $(document).on('click', '.remove', function (e) {
        e.preventDefault();
        const id = $(this).data('id');
        removeUser(id);
        return false;
    });
});
