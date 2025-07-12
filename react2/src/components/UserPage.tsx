import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../store/store";
import { fetchUsers } from "../store/userThunks";
import { usersSelectors, isLoadingSelectors, errorSelectors } from "../store/userSlice";


export default function UserPage() {

  const dispatch = useAppDispatch();
  const users = useAppSelector(usersSelectors);
  const isLoading = useAppSelector(isLoadingSelectors)
  const error = useAppSelector(errorSelectors)

  useEffect(() => {
    dispatch(fetchUsers());
  }, []);

  return (
    <ul>
    {isLoading ? <h1>loading..</h1> : null}
    {error ? <h1>{error}</h1> : null}
    {users.map((user)=> <li key={user.id}> {user.username} </li>)}
    </ul>
)
}
