import fetch from 'node-fetch'

const response = await fetch('http://127.0.0.1:5000/analyse', {
	method: 'post',
	body: JSON.stringify("videos/f7241fe8-2b94-4eef-b2af-e30bc40c4129.mp4"),
	headers: {'Content-Type': 'application/json'}
});
  const [data] = await response.json();
  console.log(data)