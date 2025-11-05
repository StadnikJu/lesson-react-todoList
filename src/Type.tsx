export type Task = {
  id: string;
  title: string;
  isDone: boolean;
}

export type FilterValuesType = "all" | "active" | "completed";

// new todolidt
export type TodoListType = {
  id: string;
  title: string;
  filter: FilterValuesType;
}
// new todolidt
export type TaskStateType = {
  [todoListId: string]: Task[];
}