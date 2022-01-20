const userLogout = async () => {
  const postResponse = await fetch('/api/users/logout', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  });

  if (postResponse.ok) {
    document.location.replace('/login');
  } else {
    alert(postResponse.statusText);
  }
};

document.querySelector('#logout').addEventListener('click', userLogout);
