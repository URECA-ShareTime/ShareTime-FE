import axios from 'axios';
import moment from 'moment';

export const getAllEvents = async () => {
  try {
    const response = await axios.get('http://localhost:8080/main/events');
    if (response.status !== 200) {
      throw new Error('Network response was not ok');
    }
    console.log('get success: ', response.data);
    return response.data;
  } catch (error) {
    console.error('get failed: ', error);
    return [];
  }
};

export const createEvent = async (event) => {
  console.log('createStart: ', event.start);
  console.log('createEnd: ', event.end);

  const parsedEvent = {
    title: event.title,
    description: event.description,
    start_time: moment(event.start).format('YYYY-MM-DDTHH:mm:ss.SSSZ'),
    end_time: moment(event.end).format('YYYY-MM-DDTHH:mm:ss.SSSZ'),
    group_type: event.groupType,
    class_id: event.classId, 
    study_id: event.studyId,
    creator_id: event.creator,
  };

  console.log(parsedEvent);

  try {
    const response = await axios.post('http://localhost:8080/main/events', parsedEvent, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.status === 201) { //저장이 성공할 경우에만 createEvent 리턴
      const createEvent = response.data;
      console.log('Event created successfully:', createEvent);
      return createEvent;
    } else if (response.status === 500){
      console.error('Internal Server Error: Event creation failed');
    } else {
      console.error('Unexpected response:', response.status);
    }
  } catch (error) {
    console.error('Network error: ', error);
  }
  return null; //이외의 경우에는 null 리턴
};

export const updateEvent = async (event) => {
  console.log('updateStart: ', event.start);
  console.log('updateEnd: ', event.end);

  const parsedEvent = {
    title: event.title,
    description: event.description,
    start_time: moment(event.start).format('YYYY-MM-DDTHH:mm:ss.SSSZ'),
    end_time: moment(event.end).format('YYYY-MM-DDTHH:mm:ss.SSSZ'),
    group_type: event.groupType,
    class_id: event.classId,
    study_id: event.studyId,
    creator_id: event.creator,
  };

  console.log(parsedEvent);

  try {
    const response = await axios.put(`http://localhost:8080/main/events/${event.id}`, parsedEvent, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.status === 200) {
      const updatedEvent = response.data;
      console.log('Event updated successfully:', updatedEvent);
      return updatedEvent;
    } else if (response.status === 500){
      console.error('Internal Server Error: Event update failed');
    } else {
      console.error('Unexpected response:', response.status);
    }
  } catch (error) {
    console.error('Network error: ', error);
  }
  return null;
};

export const deleteEvent = async (eventId) => {
  try {
    const response = await axios.delete(`http://localhost:8080/main/events/${eventId}`);
    if (response.status === 204) {
      console.log('Event deleted successfully:', eventId);
      return eventId;
    } else if (response.status === 500){
      console.error('Internal Server Error: Event deletion failed');
    } else {
      console.error('Unexpected response:', response.status);
    }
  } catch (error) {
    console.error('Network error: ', error);
  }
  return null;
}