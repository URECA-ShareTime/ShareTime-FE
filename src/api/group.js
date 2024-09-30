import axios from 'axios';

export const getClass = async () => {
  try {
    const response = await axios.get('http://localhost:8080/user/info', {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
    });
    if (response.status !== 200) {
      throw new Error('Network response was not ok');
    }
    console.log('get success:', response.data);
		const classData = {
			id: response.data.class_id,
			name: response.data.class_id === 1 ? 'FrontEnd' : 'BackEnd',
		}
		return classData;
  } catch (error) {
    console.error('Failed to fetch classes:', error);
    return null;
  }
};

export const getStudy = async () => {
	try {
		const response = await axios.get('http://localhost:8080/user/study-list', {
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
			},
		});
		if (response.status !== 200) {
			throw new Error('Network response was not ok');
		}
		console.log('get success:', response.data);
		return response.data;
	} catch (error) {
		console.error('Failed to get studies:', error);
		return [];
	}
}
