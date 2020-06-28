class RemoveColumns < ActiveRecord::Migration[6.0]
  def change
    remove_column :teachers, :documents
  end
end
