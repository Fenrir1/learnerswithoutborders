class CreateDocuments < ActiveRecord::Migration[6.0]
  def change
    create_table :documents do |t|
      t.string :documentname
      t.string :documentpath
      t.references :user, polymorphic: true, null: false

      t.timestamps
    end
  end
end
