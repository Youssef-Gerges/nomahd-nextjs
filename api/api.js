import axios from 'axios';
import Cookies from "js-cookie";

export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://nomahd.com/api/v2';

let lang = 'sa';

try{
 lang = JSON.parse(Cookies.get('language'))?.id;
}catch(e){}

export const api = axios.create({
  baseURL: API_BASE_URL,
  // withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
   'Content-Language': lang
  }
});

export const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null
export const user_id = typeof window !== 'undefined' ? localStorage.getItem('id') : null
export const temp_user_id = typeof window !== 'undefined' ? localStorage.getItem('temp_user_id') : null
// export const token = typeof window !== 'undefined' ? localStorage.getItem('token') : 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjA2YzFmNTg5ZDRhZWExM2M5NmRlOGJkYTU3N2JjZDMwZjU0MzNlYjg2ZGJjNjYxOWZlZGQ0NGQwNDE3NGM0NjU4NzFhZWUyNmJlOTcyMDg2In0.eyJhdWQiOiIxIiwianRpIjoiMDZjMWY1ODlkNGFlYTEzYzk2ZGU4YmRhNTc3YmNkMzBmNTQzM2ViODZkYmM2NjE5ZmVkZDQ0ZDA0MTc0YzQ2NTg3MWFlZTI2YmU5NzIwODYiLCJpYXQiOjE2MjIxMDIwNDksIm5iZiI6MTYyMjEwMjA0OSwiZXhwIjoxNjUzNjM4MDQ5LCJzdWIiOiI4Iiwic2NvcGVzIjpbXX0.n9BMDf-QIByUav2pASbpPMUQVqTQMZL1DsikHTjch2dz_QeEaVqfd3KORcqVVaLIbsVd4uUu8hZKgR435_8rba0QZ1ggwyulhv6hoUSGdA7yZcGKRFAqUBZJr8F4s7DVEo3QvnhsqkBz-pxLDUOT4t6t0_67NwYADZ3ASbab3E9kjmXgbEruo0XvmZ78PP8RqGjpf-4D2OBctOw4Jdk_pRjd1LwQv8b2W8I9tONLzMXvHE7EJdIeEBM5LeUd9bBz_cnn8zI02qCnUidGc6LeWyGA0eyvuRUo_nRnhStYHOOjKY0Fb_BzEivIuwNp04ev03aJrfNENh1CGUDrY9n2sALN1fRziLnImwtpVIhXvUSgbDVhJyvmMdvcKvYmNrDLxMxnhsdZ9-uGTNFLU7ViqbwB6oLhnF5rqOKcy9WgOBd3-uVjU3QOsZ_qMndmj5cMP5LYZT74bo4gIBRN_7lYGMzPmvTzjwAuC6UD-O1y_rB8gVVlJkN8cyVs8LvwE_V9vHepAaelxpkLVlwWOTd350RxHO7n0B51rrg3Y8dqS-cdgxA5h1-VRugOuXwRqV7lDKFVm9naOStfMl4o4Dgh8bjb03GzG6W1zJXqtDuUbpOKSOchjpuxfH2NLM2LxUZLH6RkrV9YFAin8N6imZ82GVn9l_GAkZOaMGFvTKSp-_Y';
// if (token) {
//   api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
// }

