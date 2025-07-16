import { call, put, takeEvery } from 'redux-saga/effects';
import { fetchPostsRequest, fetchPostsSuccess, fetchPostsFailure } from './postsSlice';
import type { Post } from '../types/Post';
import type { ApiResponse } from '../types/ApiTypes';


// API функция
const fetchPostsFromAPI = async (): Promise<Post[]> => {
  try {
    const response = await fetch('https://studapi.teachmeskills.by/blog/posts/?limit=100');
    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status} ${response.statusText}`);
    }
    const data: ApiResponse<Post> = await response.json();

    return data.results;
  } catch (error) {
    throw error;
  }
};

// Worker saga
function* fetchPostsSaga(): Generator<any, void, any> {
  try {
    const posts: Post[] = yield call(fetchPostsFromAPI);
    yield put(fetchPostsSuccess(posts));
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    yield put(fetchPostsFailure(errorMessage));
  }
}

// Watcher saga
function* watchFetchPosts() {
  yield takeEvery(fetchPostsRequest.type, fetchPostsSaga);
}

export default watchFetchPosts;
