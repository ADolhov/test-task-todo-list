class ChangeTodosCompletedDefaultValue < ActiveRecord::Migration[7.1]
  def change
    change_column_default :todos, :completed, false

    Todo.where(completed: nil).update_all(completed: false)

    add_index :todos, :title
    add_index :todos, :completed
  end
end
