# frozen_string_literal: true

class CreateTodos < ActiveRecord::Migration[7.1]
  def change
    create_table :todos do |t|
      t.string :title, null: false
      t.text :description
      t.boolean :completed

      t.timestamps
    end
  end
end
