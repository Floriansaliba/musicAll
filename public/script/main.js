const saveButtons = document.querySelectorAll('.save');

saveButtons.forEach((button) => {
  button.addEventListener('click', (e) => {
    const parentElement = e.target.closest('.result');
    const imgSrc = parentElement.querySelector('img').src;
    const audioSrc = parentElement.querySelector('audio').src;
    const artist = parentElement.querySelector('.artist').innerText;
    const title = parentElement.querySelector('.title').innerText;

    const data = {
      id: parentElement.id,
      imgSrc: imgSrc,
      audioSrc: audioSrc,
      artist: artist,
      title: title,
    };

    fetch('/save-track', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Success:', data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  });
});

// Suppression de musiques

const deleteButtons = document.querySelectorAll('.delete');

console.log(deleteButtons);

deleteButtons.forEach((button) => {
  button.addEventListener('click', (e) => {
    const currentButton = e.currentTarget;
    const id = currentButton.id;

    const data = {
      id: id,
    };

    fetch('/delete-track', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status == 'ok') {
          //on va supprimer le block de la musique
          currentButton.parentElement.remove();
        } else {
        }
        console.log('Success:', data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  });
});

// Ajout à une playlist

const addButtons = document.querySelectorAll('.add');

addButtons.forEach((button) => {
  button.addEventListener('click', (e) => {
    const currentButton = e.currentTarget;
    const selectButton = currentButton.previousSibling;
    const deleteButton = selectButton.previousSibling;
    const likeId = deleteButton.id;
    const playlistName = selectButton.value;
    const data = { likeId: likeId, playlistName: playlistName };
    console.log(data);

    fetch('/add-to-playlist', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        response.json();
      })
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  });
});

// Supprimer une playlist

const deletePlaylistButtons = document.querySelectorAll('.closeBtn');

deletePlaylistButtons.forEach((button) => {
  button.addEventListener('click', (e) => {
    const currentButton = e.currentTarget;
    const id = currentButton.id;
    const data = {
      id: id,
    };
    console.log(id);
    fetch('/delete-playlist', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message == 'Playlist deleted successfully.') {
          //on va supprimer le block de la musique
          button.parentElement.remove();
        } else {
        }
        console.log('Success:', data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  });
});

// Supprimer une musique d'une playlist :

const deleteFromPlaylistButton = document.querySelectorAll(
  '.delete-from-playlist'
);

deleteFromPlaylistButton.forEach((button) => {
  button.addEventListener('click', (e) => {
    const currentButton = e.target;
    const musicId = currentButton.id;
    const url = window.location.href;
    const playlistId = url.substring(url.lastIndexOf('/') + 1);
    console.log(playlistId);
    const data = {
      musicId: musicId,
      playlistId: playlistId,
    };
    console.log(data);
    fetch('/delete-from-playlist', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message == 'Music deleted from playlist.') {
          //on va supprimer le block de la musique
          button.parentElement.remove();
        } else {
        }
        console.log('Success:', data);
      });
  });
});
