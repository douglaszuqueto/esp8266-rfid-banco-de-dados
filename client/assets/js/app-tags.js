const tagsTable = document.getElementById('tags-table');
const tagInput = $('#tag');
const stateChebox = $('#state');
const idInput = $('#id');

const Tags = {
  all: () => {
    return http.get(endpoints.tags);
  },
  get: (id) => {
    return http.get(`${endpoints.tags}/${id}`);
  },
  create: (data) => {
    return http.post(endpoints.tags, data);
  },
  update: (id, data) => {
    return http.put(`${endpoints.tags}/${id}`, data);
  },
  remove: (id) => {
    return http.delete(`${endpoints.tags}/${id}`);
  }
};

const updateTable = () => {
  Tags.all()
    .then((tags) => tags.data)
    .then((tags) => {
      let table = '';

      tags.forEach((tag) => {
        table += `<tr>`;
        table += `<td>${tag.id}</td>`;
        table += `<td>${tag.id_user}</td>`;
        table += `<td>${tag.tag}</td>`;
        table += `<td class="has-text-centered"><span class="tag ${tag.state ? 'is-success' : 'is-black'}">${tag.state ? 'Ativada' : 'Desativada'}</span></td>`;
        table += `<td class="has-text-centered edit" data-id="${tag.id}"><span class="icon"><i class="fa fa-edit"></i></span></td>`;
        table += `<td class="has-text-centered remove" data-id="${tag.id}"><span class="icon"><i class="fa fa-trash-o"></i></span></td>`;
        table += `</tr>`;
      });
      tagsTable.innerHTML = table;
    })
    .catch((err) => console.log);
};

const resetForm = () => {
  idInput.val('');
  tagInput.val('');

  updateTable();

  $('html').removeClass('is-clipped');
  $('#modal-ter').removeClass('is-active');
};

const createOrUpdate = () => {
  const id = idInput.val();

  const data = {
    tag: tagInput.val(),
    state: stateChebox.is(':checked') ? 1 : 0
  };

  if (id) {
    return Tags.update(id, data)
      .then((tag) => successMessage('Tag atualizada com sucesso'))
      .then((tag) => resetForm())
      .catch((err) => dangerMessage(err));
  }

  return Tags.create(data)
    .then((tag) => successMessage('Tag criada com sucesso'))
    .then((tag) => resetForm())
    .catch((err) => dangerMessage(err));
};

const remove = (id) => {
  Tags.remove(id)
    .then((user) => successMessage('Removida com sucesso'))
    .then((user) => updateTable())
    .catch((err) => dangerMessage(err));
};

$(document).ready(() => {
  updateTable();
  $('.create-tag').on('click', function (e) {

    createOrUpdate();

    return false;
  });

  $(document).on('click', '.remove', function (e) {
    e.preventDefault();

    const id = $(this).data('id');
    remove(id);
    return false;
  });

  $(document).on('click', '.edit', function (e) {
    e.preventDefault();

    const id = $(this).data('id');
    const target = $('.modal-button').data('target');

    Tags.get(id)
      .then((tag) => tag.data)
      .then((tag) => {
        idInput.val(tag.id);
        tagInput.val(tag.tag);
        stateChebox.prop('checked', tag.state);

        $('html').addClass('is-clipped');
        $(target).addClass('is-active');
      })
      .catch((err) => console.log(err));

    return false;
  });
});
