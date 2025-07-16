import { call, put, takeEvery } from 'redux-saga/effects';
import { fetchPostsRequest, fetchPostsSuccess, fetchPostsFailure } from './postsSlice';
import { postsAPI } from '../services/api';

// Worker saga
function* fetchPostsSaga(): Generator<any, void, any> {
  try {
    const response: Awaited<ReturnType<typeof postsAPI.getAllPosts>> = yield call(postsAPI.getAllPosts);
    
    yield put(fetchPostsSuccess(response.results));
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
